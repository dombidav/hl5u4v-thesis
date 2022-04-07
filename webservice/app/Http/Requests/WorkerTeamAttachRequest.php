<?php

namespace App\Http\Requests;

use App\Utils\Bouncer;
use Illuminate\Foundation\Http\FormRequest;

class WorkerTeamAttachRequest extends TeamRequest
{
    public function rules(): array
    {
        return [
            'worker_id' => ['required', 'exists:workers,id'],
            'team_id' => ['required', 'exists:teams,id']
        ];
    }
}
