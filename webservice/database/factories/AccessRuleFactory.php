<?php

namespace Database\Factories;

use App\Models\AccessRule;
use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

class AccessRuleFactory extends Factory
{

    protected $model = AccessRule::class;


    #[ArrayShape(['name' => 'string', 'description' => 'array|null|string', 'definition' => 'array'])]
    public function definition(): array
    {
        $days = [0, 1, 2, 3, 4, 5, 6];
        for ($i = 0; $i < $this->faker->numberBetween(0, 6); $i++) {
            unset($days[$this->faker->numberBetween(0, count($days))]);
            $days = array_values($days);
        }

        $object = $this->faker->boolean
            ? [
                'onDays' => $days,
                'from' => $this->faker->dateTime()->format('H:i:s.v'),
                'until' => $this->faker->dateTime()->format('H:i:s.v'),
                'action' => $this->faker->boolean ? 'allow' : 'forbid'
            ]
            : [
                'on' => $this->faker->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
                'action' => $this->faker->boolean ? 'allow' : 'forbid'
            ];
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->boolean(60) ? $this->faker->sentences(3, true) : null,
            'definition' => $object
        ];
    }
}
