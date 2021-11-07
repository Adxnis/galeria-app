<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PhotoFactory extends Factory
{
    protected $table =  'photo';
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [ 
            'name' => $this->faker->name(),
            'size' => $this->faker->numberBetween(1,1000),
            'file_type' => $this->faker->text(5),
            'date_last_modified' => $this->faker->dateTime()
        ];
    }
}
