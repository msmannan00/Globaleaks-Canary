<div class="modal fade" id="subscribeModal" tabindex="-1" aria-labelledby="subscribeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="subscribeModalLabel">Subscribe to whistleaks</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('subscribe') }}" method="post">
                @csrf
            <div class="modal-body">
                <div class="mb-3">
                    <input type="password" class="form-control @error('password') is-invalid @enderror" id="password" name="password" placeholder="Password" aria-label="Password">
                </div>
                @if ($errors->has('password'))
                    <span class="text-danger">{{ $errors->first('password') }}</span>
                @endif
                <span class="badge bg-info text-white p-2">You will be redirected to payment gateway</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <input type="hidden" id="lookup_key" name="lookup_key" value="1234" />
                <button type="submit" class="btn btn-primary">Subscribe</button>
            </div>
            </form>
        </div>
    </div>
</div>