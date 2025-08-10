<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Lot;

use Illuminate\Support\Facades\File;

// Функция для получения случайного изображения собаки
function getRandomDog()
{
    $json = File::get(base_path('random-dogs.json'));
    $images = json_decode($json, true);

    $random_image = $images[array_rand($images)];

    return $random_image;
}

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lot>
 */
class LotFactory extends Factory
{
    protected $model = Lot::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'photo' => getRandomDog(),
            'title' => $this->faker->words(3, true),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'status' => $this->faker->randomElement(['active', 'finished']),
        ];
    }
}
