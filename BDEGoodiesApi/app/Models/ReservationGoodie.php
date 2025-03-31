<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationGoodie extends Model
{
    // Nom de la table
    protected $table = 'reservation_goodies';

    // Clé primaire
    protected $primaryKey = ['idReservation', 'idGoodie'];

    // Indique que la clé primaire est composée
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    // Champs remplissables
    protected $fillable = [
        'idReservation',
        'idGoodie',
        'quantite'
    ];

    // Champs non remplissables
    protected $guarded = [
        'idReservationGoodie',
    ];

    // Champs à cacher dans les réponses JSON
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    // Champs à convertir en types natifs
    protected $casts = [
        'idReservation' => 'integer',
        'idGoodie' => 'integer',
        'quantite' => 'integer',
    ];

    // Relation avec le modèle Reservation
    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'idReservation', 'idReservation');
    }

    // Relation avec le modèle Goodie
    public function goodie()
    {
        return $this->belongsTo(Goodie::class, 'idGoodie', 'idGoodie');
    }
}
