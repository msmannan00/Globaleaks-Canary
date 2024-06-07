<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Price;
use Stripe\Checkout\Session;
use Stripe\Subscription;
use Stripe\BillingPortal\Session as BillingPortalSession;
use Exception;
use DB;
use Carbon\Carbon;
use Stripe\Product;
class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        // Validate the incoming request
        $credentials = $request->validate([
            'password' => 'required'
        ]);

        // Check if the user is authenticated
        if (Auth::attempt(['email' => Auth::user()->email, 'password' => $credentials['password']])) {
            // User authenticated successfully, proceed with Stripe integration
            Stripe::setApiKey(config('services.stripe.secret'));

            $YOUR_DOMAIN = 'https://payment.whistleaks.com';

            try {
                $lookup_key = $request->input('lookup_key');
                $user = Auth::user();
                $prices = Price::all([
                    'lookup_keys' => [$lookup_key],
                    'expand' => ['data.product']
                ]);

                $checkout_session = Session::create([
                    'line_items' => [
                        [
                            'price' => $prices->data[0]->id,
                            'quantity' => 1,
                        ]
                    ],
                    'mode' => 'subscription',
                    'success_url' => $YOUR_DOMAIN . '/dashboard?session_id={CHECKOUT_SESSION_ID}',
                    'cancel_url' => $YOUR_DOMAIN . '/dashboard',
                    'metadata' => [
                        'email' => $user->email,
                        'product_id' => $user->product_id,
                    ]
                ]);

                return redirect($checkout_session->url);
            } catch (Exception $e) {
                return back()->withErrors(['error' => $e->getMessage()]);
            }
        }

        // If authentication fails, return back with an error message
        return back()->withErrors([
            'password' => 'Your provided credentials do not match our records.',
        ])->withInput();
    }
    public function showDashboard()
    {
        $user = Auth::user();
        $email = $user->email;
    
        // Check if the user has an active subscription
        $subscriptionRecord = DB::table('subscriptions')->where('user_email', $email)->first();
    
        if ($subscriptionRecord) {
            // Fetch subscription details from Stripe
            try {
                Stripe::setApiKey(config('services.stripe.secret'));
                $subscriptions = Subscription::all([
                    'customer' => $subscriptionRecord->customer_id,
                    'status' => 'active',
                ]);
                $activeSubscription = $subscriptions->data[0] ?? null;
    
                if ($activeSubscription) {
                    $plan = $activeSubscription->plan;
    
                    // Fetch the product details associated with the plan
                    $product = Product::retrieve($plan->product);
    
                    $subscriptionDetails = [
                        'id' => $activeSubscription->id,
                        'status' => $activeSubscription->status,
                        'current_period_start' => Carbon::createFromTimestamp($activeSubscription->current_period_start)->toDateTimeString(),
                        'current_period_end' => Carbon::createFromTimestamp($activeSubscription->current_period_end)->toDateTimeString(),
                        'amount' => number_format($plan->amount / 100, 2),
                        'currency' => strtoupper($plan->currency),
                        'interval' => ucfirst($plan->interval),
                        'product_name' => $product->name,
                    ];
    
                    return view('auth.dashboard', [
                        'user' => $user,
                        'subscription' => $subscriptionDetails
                    ]);
                } else {
                    return view('auth.dashboard', [
                        'user' => $user,
                        'subscription' => null
                    ]);
                }
            } catch (Exception $e) {
                return view('auth.dashboard', [
                    'user' => $user,
                    'error' => $e->getMessage()
                ]);
            }
        } else {
            return view('auth.dashboard', [
                'user' => $user,
                'subscription' => null
            ]);
        }
    }
    public function unsubscribe(Request $request)
    {
        // Validate the incoming request
        $credentials = $request->validate([
            'password' => 'required'
        ]);

        $user = Auth::user();
        $email = $user->email;

        // Check if the provided password is correct
        if (Auth::attempt(['email' => $user->email, 'password' => $credentials['password']])) {
            // Find the user's subscription
            $subscription = DB::table('subscriptions')->where('user_email', $email)->first();

            if ($subscription) {
                try {
                    Stripe::setApiKey(config('services.stripe.secret'));
                    $stripeSubscription = Subscription::retrieve($subscription->subscription_id);
                    $stripeSubscription->cancel();
                    return redirect()->route('dashboard')->with('success', 'Subscription cancelled successfully.');
                } catch (Exception $e) {
                    return back()->withErrors(['error' => $e->getMessage()]);
                }
            }

            return back()->withErrors(['error' => 'No active subscription found.']);
        }

        // If authentication fails, return back with an error message
        return back()->withErrors([
            'password' => 'Your provided credentials do not match our records.',
        ])->withInput();
    }
    public function createPortalSession(Request $request)
    {
        $request->validate([
            'session_id' => 'required|string',
        ]);

        $sessionId = $request->input('session_id');

        // See your keys here: https://dashboard.stripe.com/apikeys
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $checkoutSession = Session::retrieve($sessionId);

            // Create the billing portal session
            $session = BillingPortalSession::create([
                'customer' => $checkoutSession->customer,
                'return_url' => url("/dashboard"), // Update this to your desired return URL
            ]);

            return redirect($session->url);
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Unable to create billing portal session.']);
        }
    }
    
    public function checkStatus(Request $request)
    {
    $product_id = $request->input('product_id');

    if (!$product_id) {
        return response()->json(['error' => 'Product ID is required'], 400);
    }

    $exists = DB::table('subscriptions')->where('user_product_id', $product_id)->exists();

    return response()->json(['exists' => $exists]);
    }

}
