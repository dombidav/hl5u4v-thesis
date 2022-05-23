<?php

namespace Database\Factories;

use App\Models\AccessRule;
use App\Models\Lock;
use App\Models\Log;
use App\Models\Worker;
use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

class LogFactory extends Factory
{
    protected $model = Log::class;

    #[ArrayShape(['event' => 'string', 'action' => 'string', 'worker_id' => 'mixed', 'lock_id' => 'mixed', 'rule_id' => 'mixed|null'])]
    public function definition(): array
    {
        return [
            'event' => $this->faker->boolean(90) ? 'entry' : 'other',
            'action' => $this->faker->boolean ? 'allow' : 'forbid',
            'worker_id' => Worker::random()->id,
            'lock_id' => Lock::random()->id,
            'rule_id' => $this->faker->boolean ? AccessRule::random()->id : null,
        ];
    }
}
