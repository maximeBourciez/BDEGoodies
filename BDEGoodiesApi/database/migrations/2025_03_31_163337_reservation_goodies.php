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
            $table->foreign('idReservation')->references('idReservation')->on('reservationss');
            $table->foreign('idGoodie')->references('idGoodie')->on('goodies');

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
