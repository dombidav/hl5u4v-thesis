<?php

namespace App\Http\Requests;

use App\Models\AccessRule;
use App\Rules\ValidateRuleDefinition;

class AccessRuleUpdateRequest extends ApiResourceRequest
{
    /** @inheritDoc */
    public function rules(): array
    {
        return
            [
                'name' => ['min:3'],
                'description' => [],
                'definition' => [new ValidateRuleDefinition()],
                'action' => ['in:allow,forbid'],
            ];
    }

    protected function getModel(): string
    {
        return AccessRule::class;
    }
}
