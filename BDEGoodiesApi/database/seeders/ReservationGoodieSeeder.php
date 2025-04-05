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
        $goodies = DB::table('goodies')->get();

        foreach ($reservations as $reservationId) {
            $numGoodies = $faker->numberBetween(1, 3);
            $selectedGoodies = $faker->randomElements($goodies, $numGoodies);

            foreach ($selectedGoodies as $goodie) {
                // Calculate the available stock for the goodie
                $stockReserve = DB::table('reservation_goodies')
                    ->where('idGoodie', $goodie->idGoodie)
                    ->sum('quantite');

                $stockRestant = $goodie->quantite - $stockReserve;

                // Check if the requested quantity is available
                $quantite = $faker->numberBetween(1, min($stockRestant, 5));

                if ($stockRestant > 0) {
                    DB::table('reservation_goodies')->insert([
                        'idReservation' => $reservationId,
                        'idGoodie' => $goodie->idGoodie,
                        'quantite' => $quantite,
                    ]);
                } else {
                    // Log a warning if stock is insufficient
                    \Log::warning("Stock insuffisant pour le goodie ID: {$goodie->idGoodie}");
                }
            }
        }
    }
}
