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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id('idReservation');
            $table->unsignedBigInteger('idEtudiant');
            $table->unsignedBigInteger('idEvenement');
            $table->date('dateReservation');
            $table->enum('statut', ['Confirmée', 'En attente', 'Annulée'])->default('En attente');

            // Clés étrangères
            $table->foreign('idEtudiant')->references('idEtudiant')->on('etudiants')->onDelete('cascade');
            $table->foreign('idEvenement')->references('idEvenement')->on('evenements')->onDelete('cascade');

            // Empêcher les réservations en double
            $table->unique(['idEtudiant', 'idEvenement']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
