@extends('auth.layouts')

@section('content')

    <div class="row justify-content-center mt-5">
        <div class="form-user">
            <div class="card">
                <div class="card-header">Login</div>
                <div class="card-body">
                    <form action="{{ route('authenticate') }}" method="post">
                        @csrf
                        <div class="input-group">
                           <span class="input-group-text">
                             <i class="fa-solid fa-envelope"></i>
                           </span>
                            <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email') }}" placeholder="Email Address" aria-label="Email">
                        </div>
                        @if ($errors->has('email'))
                            <div class="text-danger">{{ $errors->first('email') }}</div>
                        @endif
                        <br>
                        <div class="input-group">
                           <span class="input-group-text">
                             <i class="fa-solid fa-lock"></i>
                           </span>
                            <input type="password" class="form-control @error('password') is-invalid @enderror" id="password" name="password" placeholder="Password" aria-label="Password">
                        </div>
                        @if ($errors->has('password'))
                            <span class="text-danger">{{ $errors->first('password') }}</span>
                        @endif

                        <br><div class="input-group">
                            <input type="submit" class="submit col-md-3 offset-md-9 btn btn-primary" value="Login">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

@endsection
