<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Whistleaks Payments</title>


    <link rel="icon" type="image/x-icon" href="{{ asset('images/favicon.ico') }}">
    <link href="{{ asset('font-awesome/css/all.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>

</head>
<body>
    <div><header id="header-box" class="p-3">
            <div class="d-flex flex-wrap justify-content-between">
                @guest
                    <div id="">
                        <div id="LogoBox">
                            <a href="/login"><img class="img-fluid-logo pointer" src="{{ asset('images/logo.png') }}" alt=""></a>
                        </div>
                    </div>
                @else
                    <div id="">
                        <div id="LogoBox">
                            <a href="/"><img class="img-fluid-logo pointer" src="{{ asset('images/logo.png') }}" alt=""></a>
                        </div>
                    </div>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="btn">
                            <i class="pointer fa-solid fa-fw fa-sign-out-alt"></i> Logout
                        </button>
                    </form>
                @endguest
            </div>
        </header>
    </div>
    <div class="">
        @yield('content')
        <br><br><br><br><br><br><br>
        <div class="mt-5 pt-5 pb-5 footer-main">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5 col-xs-12 about-company">
                        <h2>Whistleaks</h2>
                        <p class="pr-5 text-white-50">Whistleaks is a global whistleblowing system for reporting misconduct, fraud, or unethical behavior in online interactions.</p>
                        <p>
                            <a href="https://www.youtube.com/watch?v=Q6k8hHAoIKA&ab_channel=Christiaan008">
                                &nbsp;&nbsp;<img src="{{ asset('images/youtube.png') }}" class="img-fluid icon-size" alt=""/>
                            </a>
                            <a href="https://www.linkedin.com/company/whistleaks/">
                                &nbsp;&nbsp;<img src="{{ asset('images/linkedin.png') }}"  class="img-fluid icon-size" alt=""/>
                            </a>
                        </p>
                    </div>
                    <div class="col-lg-3 col-xs-12 links">
                        <h4 class="mt-lg-0 mt-sm-3">Links</h4>
                        <ul class="m-0 p-0">
                            <li>- <a href="https://www.whistleaks.com/" class="url-weight">Homepage</a></li>
                            <li>- <a href="https://www.whistleaks.com/about" class="url-weight">About Us</a></li>
                            <li>- <a href="https://www.whistleaks.com/whistleblowing-awareness-week" class="url-weight">Awareness Week</a></li>
                            <li>- <a href="https://www.whistleaks.com/contact" class="url-weight">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-4 col-xs-12 location">
                        <h4 class="mt-lg-0 mt-sm-4">Location</h4>
                        <p>Whistleaks Limited, Studio X, Boundary Road, Colchester CO4 3ZQ, United Kingdom.</p>
                        <p class="mb-0"><i class="fa fa-globe mr-3"></i>&nbsp;<a href="https://www.whistleaks.com/" class="text-decoration-none text-reset url-weight">www.whistleaks.com/</a></p>
                        <br>
                        <p>
                            <i class="fa fa-envelope mr-3"></i>&nbsp;
                            <a href="mailto:info@whistleaks.com" class="text-decoration-none text-reset url-weight">Customer Support</a>
                        </p>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col copyright">
                        <p class=""><small class="text-white-50">© 2024. All Rights Reserved.</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
