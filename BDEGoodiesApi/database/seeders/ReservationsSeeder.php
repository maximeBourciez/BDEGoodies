<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\Reservation;
use App\Models\Etudiant;
use App\Models\Evenement;
use App\Models\Goodie;
use Illuminate\Database\QueryException;

class ReservationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        // Get all student and event IDs
        $etudiants = DB::table('etudiants')->pluck('idEtudiant')->toArray();
        $evenements = DB::table('evenements')->pluck('idEvenement')->toArray();
        
        $statuts = ['Confirmée', 'En attente', 'Annulée'];
        
        $attempts = 0;
        $successfulInserts = 0;
        $maxAttempts = 200; 
        $targetInserts = 100; 
        
        DB::beginTransaction();
        
        try {
            while ($successfulInserts < $targetInserts && $attempts < $maxAttempts) {
                $attempts++;
                
                $data = [
                    'idEtudiant' => $faker->randomElement($etudiants),
                    'idEvenement' => $faker->randomElement($evenements),
                    'dateReservation' => $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
                    'statut' => $faker->randomElement($statuts),
                ];
                
                try {
                    DB::table('reservations')->insert($data);
                    $successfulInserts++;
                } catch (QueryException $e) {
                    // Error code 23000 is for integrity constraint violation
                    if ($e->getCode() != '23000') {
                        // Re-throw if it's not a duplicate key error
                        throw $e;
                    }
                    // Otherwise just continue to next attempt
                    continue;
                }
            }
            
            DB::commit();
            
            $this->command->info("Successfully created {$successfulInserts} reservations after {$attempts} attempts.");
            
        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error("Error creating reservations: " . $e->getMessage());
        }
    }
}
