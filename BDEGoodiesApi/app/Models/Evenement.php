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

    // Champs à cacher dans les réponses JSON
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
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
        return $this->belongsToMany(Etudiant::class, 'etudiant_evenement', 'idEvenement', 'idEtudiant');
    }
}
