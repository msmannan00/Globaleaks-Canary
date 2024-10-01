@extends('auth.layouts')

@section('content')

<div class="row justify-content-center mt-5 ">
    <div class="form-user">
        <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">
                <form action="{{ route('store') }}" method="post">
                    @csrf
                    <div class="input-group mb-0">
                        <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                        <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name') }}" placeholder="Name" aria-label="Name">
                    </div>
                    @if ($errors->has('name'))
                        <span class="error-margin text-danger">{{ $errors->first('name') }}</span><br>
                    @endif
                    <br>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                        <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email') }}" placeholder="Email Address" aria-label="Email">
                    </div>
                    @if ($errors->has('email'))
                        <span class="error-margin text-danger">{{ $errors->first('email') }}</span><br>
                    @endif
                    <br>

                    <div class="input-group">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input type="password" class="form-control @error('password') is-invalid @enderror" id="password" name="password" placeholder="Password" aria-label="Password">
                    </div>
                    @if ($errors->has('password'))
                        <span class="error-margin text-danger">{{ $errors->first('password') }}</span><br>
                    @endif
                    <br>

                    <div class="input-group">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" placeholder="Confirm Password" aria-label="Confirm Password">
                    </div><br>

                    <div class="input-group">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input type="text" class="form-control @error('product_id') is-invalid @enderror" id="product_id" name="product_id" placeholder="Setup ID" aria-label="product_id">
                    </div>
                    @if ($errors->has('product_id'))
                        <span class="error-margin text-danger">{{ $errors->first('product_id') }}</span><br>
                    @endif
                    <br>

                    <div class="input-group">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input type="password" class="form-control @error('secret_key') is-invalid @enderror" id="secret" name="secret" placeholder="Secret Key" aria-label="secret">
                    </div>
                    @if ($errors->has('secret_key'))
                        <span class="error-margin text-danger">{{ $errors->first('secret_key') }}</span><br>
                    @endif
                    <br>

                    <div class="input-group">
                        <input type="submit" class="submit col-md-3 offset-md-9 btn btn-primary" value="Register">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection
