<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goodie extends Model
{
    // Nom de la table
    protected $table = 'goodies';

    // Clé primaire
    protected $primaryKey = 'idGoodie';

    // Champs remplissables
    protected $fillable = [
        'nom',
        'quantite',
        'description',
        'coutUnitaire',
    ];

    // Champs non remplissables
    protected $guarded = [
        'idGoodie',
    ];

    // Champs à cacher dans les réponses JSON
    public $timestamps = false;

    // Champs à convertir en types natifs
    protected $casts = [
        'idGoodie' => 'integer',
        'nom' => 'string',
        'quantite' => 'integer',
        'description' => 'string',
        'coutUnitaire' => 'double',
    ];

    // Relation avec le modèle Evenement
    public function evenements()
    {
        return $this->belongsToMany(Evenement::class, 'goodie_evenement', 'idGoodie', 'idEvenement');
    }

    public function reservations()
    {
        return $this->belongsToMany(Reservation::class, 'reservation_goodies', 'idGoodie', 'idReservation')
            ->withPivot('quantite');
    }
}
