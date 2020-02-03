<?php

use Illuminate\Database\Seeder;
use App\Store;
use App\Article;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $faker = \Faker\Factory::create();
        $store = Store::all()->pluck('id')->toArray();

        // And now, let's create a few articles in our database:
        for ($i = 0; $i < 50; $i++) {
            Article::create([
                'name' => $faker->colorName,
                'description' => $faker->sentence(6, true),
                'price' => $faker->randomFloat(2, 100, 999999),
                'total_in_shelf' => $faker->numberBetween(1, 30),
                'total_in_vault' => $faker->numberBetween(20, 100),
                'store_id' => $faker->randomElement($store),
            ]);
        }
    }
}
