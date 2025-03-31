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
            $table->unsignedBigInteger('idEvt');
            $table->string('nomEvt');
            $table->datetime('date');
            $table->integer('prixEntree');
            $table->integer('capaciteMax');
            $table->string('theme');            

            // Clé primaire
            $table->primary('idEvt');
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
