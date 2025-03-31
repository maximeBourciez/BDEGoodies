<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\Goodie;

class GoodiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        $goodies = [
            'T-shirt',
            'Stylo',
            'Mug',
            'Porte-clés',
            'Casquette',
            'Sac',
            'Carnet',
            'Gourde',
            'Polo',
            'Tapis de souris'
        ];

        foreach ($goodies as $goodie) {
            DB::table('goodies')->insert([
                'nom' => $goodie,
                'quantite' => $faker->numberBetween(10, 100),
                'description' => $faker->sentence(),
                'coutUnitaire' => $faker->randomFloat(2, 1, 50),
            ]);
        }
    }
}
