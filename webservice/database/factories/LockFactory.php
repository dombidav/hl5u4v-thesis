<?php

namespace Database\Factories;

use App\Models\Lock;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use JetBrains\PhpStorm\ArrayShape;

class LockFactory extends Factory
{
    public const BUILDINGS = ['A', 'B', 'C', 'D', 'E'];
    public const ROOM_TYPE = ['OFFICE ', 'LAB ', 'STORAGE ', 'WORKSHOP ', ''];

    protected $model = Lock::class;

    #[ArrayShape(['name' => 'string', 'device_key' => 'null|string', 'status' => 'int'])]
    public function definition(): array
    {
        return [
            'name' => $this->generateLockName(),
            'device_key' => $this->faker->boolean(80) ? Str::random(10) : null,
            'status' => $this->faker->numberBetween(0,4),
        ];
    }

    private function generateLockName(): string
    {
        $building = $this->faker->randomElement(self::BUILDINGS);
        $floor = $this->faker->numberBetween(1,4);
        $room = $this->faker->numberBetween(1,99);
        $type = $this->faker->randomElement(self::ROOM_TYPE);

        if($room < 10) {
            $room = '0'.$room;
        }

        return "$type$building.$floor$room";
    }
}
