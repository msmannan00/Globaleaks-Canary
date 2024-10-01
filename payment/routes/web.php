<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginRegisterController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\WebhookController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(LoginRegisterController::class)->group(function () {
    Route::get('/', 'dashboard')->name('dashboard');
    Route::get('/register', 'register')->name('register');
    Route::post('/store', 'store')->name('store');
    Route::get('/login', 'login')->name('login');
    Route::post('/authenticate', 'authenticate')->name('authenticate');
    Route::get('/dashboard', 'dashboard')->name('dashboard');
    Route::post('/logout', 'logout')->name('logout');
});

Route::controller(SubscriptionController::class)->group(function () {
    Route::post('/subscribe', 'subscribe')->name('subscribe');
    Route::get('/dashboard', 'showDashboard')->name('dashboard');
    Route::post('/unsubscribe', 'unsubscribe')->name('unsubscribe');
    Route::post('/create-portal-session', 'createPortalSession')->name('create.portal.session');
    Route::post('/check-product', 'checkStatus')->name('checkStatus');
});

Route::post('/webhook/stripe', [WebhookController::class, 'handle']);
