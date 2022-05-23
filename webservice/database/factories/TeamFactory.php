<?php

namespace Database\Factories;

use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

class TeamFactory extends Factory
{
    const departments = [
        'Customer', 'Sales', 'Marketing', 'Employee', 'Human Resource Management', 'Partners', 'Vendors',
        'Distributors', 'Research and Development', 'Procurement', 'Production', 'Supply Chain', 'Warehouses',
        'Logistics', 'Quality', 'Inspections', 'Finance', 'Accounts', 'Legal', 'Maintenance', 'Security',
        'Administration', 'Information Technology'
    ];

    protected $model = Team::class;

    #[ArrayShape(['name' => 'string'])]
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement(self::departments),
        ];
    }
}
