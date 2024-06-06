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
                            <p>You are currently subscribed.</p>
                            <p>Subscription Details: {{ $subscription->id }}</p>
                        @else
                            <p>You are currently not subscribed.</p>
                        @endif
                    </div>
                    <div class="container mt-3 mb-3">
                        <div class="d-flex">
                            @if (isset($subscription))
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#unSubscribeModal">Cancel Subscription</button>
                            @else
                                <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal"
                                    data-bs-target="#subscribeModal">Subscribe</button>
                            @endif
                        </div>
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