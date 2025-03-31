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
        Schema::create('goodies', function (Blueprint $table) {
            $table->id('idGoodie');
            $table->string('nom');
            $table->integer('quantite');
            $table->string('description');
            $table->double('coutUnitaire')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goodies');
    }
};
