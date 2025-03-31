<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\Evenement;

class EvenementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        $themes = [
            'Technologie',
            'Art',
            'Musique',
            'Science',
            'Entrepreneuriat',
            'Sport',
            'Cinéma',
            'Littérature',
            'Gastronomie',
            'Mode'
        ];

        for ($i = 1; $i <= 10; $i++) {
            $date = $faker->dateTimeBetween('now', '+1 year');
            
            DB::table('evenements')->insert([
                'idEvenement' => $i,
                'nom' => $faker->sentence(3),
                'lieu' => $faker->city,
                'dateHeure' => $date,
                'prix' => $faker->numberBetween(0, 100),
                'capacite' => $faker->numberBetween(20, 200),
                'theme' => $faker->randomElement($themes),
            ]);
        }
    }
}
