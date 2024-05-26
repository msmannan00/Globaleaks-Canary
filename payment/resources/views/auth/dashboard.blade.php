@include('modals.subscribe')
@include('modals.unsubscribe')
@extends('auth.layouts')

@section('content')

    <div class="container-fluid d-flex align-items-center dashboard-height">
        <div class="row justify-content-center w-100">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Welcome {{ Auth::user()->name }}</div>
                    <div class="card-body">
                        <p>You are currently not subscribed</p>
                    </div>
                    <div class="container mt-3 mb-3">
                        <div class="d-flex">
                            <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#subscribeModal">Subscribe</button>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#unSubscribeModal">Cancel Subscription</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
