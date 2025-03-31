<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\Etudiant;

class EtudiantsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        for ($i = 1; $i <= 50; $i++) {
            DB::table('etudiants')->insert([
                'nom' => $faker->name,
                'mail' => $faker->unique()->safeEmail,
                'telephone' => $faker->numerify('06########'),
            ]);
        }
    }
}
