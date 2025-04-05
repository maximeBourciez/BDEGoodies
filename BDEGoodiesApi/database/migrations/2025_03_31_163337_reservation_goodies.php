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


// Migration pour la table pour verifier les réservations de goodies
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
            CREATE TRIGGER check_stock_before_insert
            BEFORE INSERT ON reservation_goodies
            FOR EACH ROW
            BEGIN
                DECLARE stock_restant INT;
                SELECT (goodies.quantite - COALESCE(SUM(reservation_goodies.quantite), 0))
                INTO stock_restant
                FROM goodies
                LEFT JOIN reservation_goodies ON goodies.idGoodie = reservation_goodies.idGoodie
                WHERE goodies.idGoodie = NEW.idGoodie
                GROUP BY goodies.idGoodie;

                IF stock_restant < NEW.quantite THEN
                    SIGNAL SQLSTATE \'45000\' SET MESSAGE_TEXT = \'Stock insuffisant\';
                END IF;
            END;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS check_stock_before_insert');
    }
};
