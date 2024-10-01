<div class="modal fade" id="unSubscribeModal" tabindex="-1" aria-labelledby="unSubscribeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="unSubscribeModalLabel">Unsubscribe from whistleaks</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('unsubscribe') }}" method="post">
                @csrf
            <div class="modal-body">
                <div class="mb-3">
                    <input type="password" class="form-control @error('password') is-invalid @enderror" id="password" name="password" placeholder="Password" aria-label="Password">
                </div>
                @if ($errors->has('password'))
                    <span class="text-danger">{{ $errors->first('password') }}</span>
                @endif
                <span class="badge bg-danger text-white p-2">Warning! you will lose your data</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit"class="btn btn-danger">cancel subscribe</button>
            </div>
            </form>
        </div>
    </div>
</div>
