@include('modals.subscribe')
@include('modals.unsubscribe')
@extends('auth.layouts')

@section('content')

<div class="container-fluid d-flex align-items-center dashboard-height">
    <div class="row justify-content-center w-100">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Welcome {{ Auth::user()->name }}</div>
                @if (!request()->has('session_id'))
                    <div class="card-body">
                        @if (isset($subscription))
                            <table class="table">
                                <tbody>
                                <tr>
                                    <th scope="row" class="bg-light">Subscription Status</th>
                                </tr>
                                <tr>
                                    <td>You are currently subscribed.</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg-light">Subscription ID</th>
                                </tr>
                                <tr>
                                    <td>{{ $subscription['id'] }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg-light">Status</th>
                                </tr>
                                <tr>
                                    <td>{{ $subscription['status'] }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg-light">Subscription Amount</th>
                                </tr>
                                <tr>
                                    <td>{{ $subscription['status'] }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg-light">Billing Interval</th>
                                </tr>
                                <tr>
                                    <td>{{ $subscription['interval'] }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg-light">Current Period Start</th>
                                </tr>
                                <tr>
                                    <td>{{ $subscription['current_period_start'] }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg-light">Current Period End</th>
                                </tr>
                                <tr>
                                    <td>{{ $subscription['current_period_start'] }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg-light">Product Name</th>
                                </tr>
                                <tr>
                                    <td>{{ $subscription['product_name'] }}</td>
                                </tr>
                                </tbody>
                            </table>
                        @else
                            <div class="alert alert-info" role="alert">
                                You are currently not subscribed.
                            </div>
                        @endif
                    </div>
                    <div class="container mt-3">
                        <div class="d-flex">
                            @if (isset($subscription))
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#unSubscribeModal">Cancel Subscription</button>
                            @else
                                <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal"
                                    data-bs-target="#subscribeModal">Subscribe</button>
                            @endif
                        </div>
                        <br>
                        @if ($errors->has('password'))
                            <div class="alert alert-danger" role="alert">
                                {{ $errors->first('password') }}
                            </div>
                        @endif
                    </div>
                @endif
                @if (request()->has('session_id'))
                    <div class="card-body">
                        <h3 class="card-title text-success">Subscription to Starter plan successful!</h3>
                        <form action="{{ route('create.portal.session') }}" method="POST" class="mt-3">
                            @csrf
                            <input type="hidden" id="session-id" name="session_id"
                                value="{{ request()->get('session_id') }}" />
                            <button id="checkout-and-portal-button" class="btn btn-info" type="submit">Manage your
                                billing information</button>
                        </form>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        if (sessionId) {
            document.getElementById('session-id').value = sessionId;
        }
    });
</script>
@endsection
