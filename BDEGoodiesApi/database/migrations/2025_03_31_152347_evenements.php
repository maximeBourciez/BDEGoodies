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
        Schema::create('evenements', function (Blueprint $table) {
            $table->unsignedBigInteger('idEvenement');
            $table->string('nom');
            $table->string('lieu');
            $table->dateTime('dateHeure');
            $table->integer('prix');
            $table->integer('capacite');
            $table->string('theme');            

            // Clé primaire
            $table->primary('idEvenement');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evenements');
    }
};
