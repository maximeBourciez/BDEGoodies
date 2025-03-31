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
            $table->unsignedBigInteger('idEvt');
            $table->date('dateReservation');
            $table->enum('statut', ['Confirmée', 'En attente', 'Annulée'])->default('En attente');

            // Clés étrangères
            $table->foreign('idEtudiant')->references('idEtudiant')->on('etudiants')->onDelete('cascade');
            $table->foreign('idEvt')->references('idEvt')->on('evenements')->onDelete('cascade');

            // Empêcher les réservations en double
            $table->unique(['idEtudiant', 'idEvt']);
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
