<?php

namespace App\Http\Requests;

use App\Models\Lock;

class LockRequest extends ApiResourceRequest
{
    /** @inheritDoc */
    public function rules(): array
    {
        return
            request()->method === 'DELETE'
                ? []
                : [
                'name' => ['required', 'min:3'],
                'status' => ['numeric', 'min:0', 'max:3']
            ];
    }

    protected function getModel(): string
    {
        return Lock::class;
    }
}
