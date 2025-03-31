<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\Goodie;
use App\Models\Evenement;
use App\Models\Etudiant;
use App\Models\Reservation;
use App\Models\ReservationGoodie;
use App\Models\Evenements;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            EtudiantsSeeder::class,
            EvenementsSeeder::class,
            GoodiesSeeder::class,
            ReservationsSeeder::class,
            ReservationGoodieSeeder::class,
        ]);
        
    }
}
