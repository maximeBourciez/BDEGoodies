<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id('idReservation');

            // Déclaration explicite pour SQLite
            $table->unsignedBigInteger('idEtudiant');
            $table->unsignedBigInteger('idEvenement');

            $table->date('dateReservation');
            $table->enum('statut', ['Confirmée', 'En attente', 'Annulée'])->default('En attente');

            // Contraintes avec syntaxe complète
            $table->foreign('idEtudiant')
                ->references('idEtudiant')
                ->on('etudiants')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('idEvenement')
                ->references('idEvenement')
                ->on('evenements')
                ->onDelete('cascade')
                ->onUpdate('cascade');

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
