<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    // Nom de la table
    protected $table = 'evenements';

    // Clé primaire
    protected $primaryKey = 'idEvenement';

    // Champs remplissables
    protected $fillable = [
        'nom',
        'dateHeure',
        'lieu',
        'prix',
        'capacite',
        'theme',
    ];

    // Champs non remplissables
    protected $guarded = [
        'idEvenement',
    ];

    
    public $timestamps = false;

    // Champs à convertir en types natifs
    protected $casts = [
        'idEvenement' => 'integer',
        'nom' => 'string',
        'lieu' => 'string',
        'dateHeure' => 'datetime',
        'prix' => 'integer',
        'capacite' => 'integer',
        'theme' => 'string',
    ];

    // Relation avec le modèle Etudiant
    public function etudiants()
    {
        return $this->belongsToMany(Etudiant::class, 'reservations', 'idEvenement', 'idEtudiant')
            ->withPivot('dateReservation', 'statut');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'idEvenement');
    }
}
