<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
            CREATE TRIGGER log_stock_error_after_insert
            AFTER INSERT ON reservation_goodies
            FOR EACH ROW
            BEGIN
                INSERT INTO seeding_errors (message, created_at, updated_at)
                SELECT
                    "Stock insuffisant pour le goodie ID: " || NEW.idGoodie,
                    CURRENT_TIMESTAMP,
                    CURRENT_TIMESTAMP
                WHERE (
                    SELECT goodies.quantite - COALESCE(SUM(reservation_goodies.quantite), 0)
                    FROM goodies
                    LEFT JOIN reservation_goodies ON goodies.idGoodie = reservation_goodies.idGoodie
                    WHERE goodies.idGoodie = NEW.idGoodie
                    GROUP BY goodies.idGoodie
                ) < NEW.quantite;
            END;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS log_stock_error_after_insert');
    }
};


