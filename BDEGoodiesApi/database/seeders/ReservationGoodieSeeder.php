<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ReservationGoodieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        // Get all reservation and goodie IDs
        $reservations = DB::table('reservations')->pluck('idReservation')->toArray();
        $goodies = DB::table('goodies')->pluck('idGoodie')->toArray();
        
        $reservationGoodies = [];
        
        // For each reservation, add 1-3 goodies
        foreach ($reservations as $reservationId) {
            $numGoodies = $faker->numberBetween(1, 3);
            $selectedGoodies = $faker->randomElements($goodies, $numGoodies);
            
            foreach ($selectedGoodies as $goodieId) {
                $reservationGoodies[] = [
                    'idReservation' => $reservationId,
                    'idGoodie' => $goodieId,
                    'quantite' => $faker->numberBetween(1, 5),
                ];
            }
        }
        
        // Insert reservation-goodie relationships
        DB::table('reservation_goodies')->insert($reservationGoodies);
    }
}
