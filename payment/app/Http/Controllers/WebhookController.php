<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Import DB facade
use Stripe\Exception\SignatureVerificationException;
use Stripe\Webhook;
use Stripe\Stripe;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {

        // Establish database connection
        $conn = DB::connection()->getPdo();

        // Retrieve payload and signature header
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $endpoint_secret = config('services.stripe.webhook_secret');

        try {
            // Construct the event
            $event = Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (SignatureVerificationException $e) {
            // Invalid signature
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        // Handle the event
        try {
            switch ($event->type) {
                case 'checkout.session.completed':
                    $checkout = $event->data->object;

                    if ($checkout->payment_status === 'paid' && isset($checkout->subscription)) {
                        $customer_id = $checkout->customer;
                        $subscription_id = $checkout->subscription;
                        $user_email = $checkout->metadata->email;
                        $user_product_id = $checkout->metadata->product_id;

                        // Prepare and bind the SQL statement
                        $stmt = $conn->prepare("INSERT INTO subscriptions (customer_id, subscription_id, user_email, user_product_id) VALUES (?, ?, ?, ?)");
                        $stmt->bindParam(1, $customer_id);
                        $stmt->bindParam(2, $subscription_id);
                        $stmt->bindParam(3, $user_email);
                        $stmt->bindParam(4, $user_product_id);

                        // Execute the statement
                        if ($stmt->execute()) {
                            return response()->json(['success' => true]);
                        } else {
                            return response()->json(['error' => 'Error storing subscription information'], 500);
                        }
                    }
                    break;

                case 'customer.subscription.deleted':
                    $subscription = $event->data->object;
                    $customer_id = $subscription->customer;
                    $subscription_id = $subscription->id;

                    // Prepare and bind the SQL statement
                    $stmt = $conn->prepare("DELETE FROM subscriptions WHERE customer_id = ? OR subscription_id = ?");
                    $stmt->bindParam(1, $customer_id);
                    $stmt->bindParam(2, $subscription_id);

                    // Execute the statement
                    if ($stmt->execute()) {
                        return response()->json(['success' => true]);
                    } else {
                        return response()->json(['error' => 'Error deleting subscription information'], 500);
                    }
                    break;

                default:
                    return response()->json(['error' => 'Received unknown event type'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error handling webhook event'], 500);
        }
    }
}
