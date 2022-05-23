<?php

namespace Database\Factories;

use App\Models\LockGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

class LockGroupFactory extends Factory
{
    protected $model = LockGroup::class;

    public function definition()
    {
        return [
            'name' => $this->generateGroupName(),
        ];
    }

    private function generateGroupName()
    {
        try {
            switch (rand(0, 1)) {
                case 0:
                    $groupNumber = $this->faker->numberBetween(1, 100);
                    return "GRP $groupNumber";
                case 1:
                    $building = $this->faker->unique()->randomElement(LockFactory::BUILDINGS);
                    return "BUILDING $building";
            }
        } catch (\Exception $e) {
            return $this->generateGroupName();
        }

    }
}
