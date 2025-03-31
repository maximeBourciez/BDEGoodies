<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservation_goodies', function (Blueprint $table) {
            // Attributs
            $table->unsignedBigInteger('idReservation');
            $table->unsignedBigInteger('idGoodie');
            $table->integer('quantite');

            // Clés étrangères
            $table->foreign('idReservation')->references('idReservation')->on('reservations');
            $table->foreign('idGoodie')->references('idGoodie')->on('goodies');

            // Clé primaire
            $table->primary(['idReservation', 'idGoodie']);

            // Empêcher les réservations en double
            $table->unique(['idReservation', 'idGoodie']);
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
