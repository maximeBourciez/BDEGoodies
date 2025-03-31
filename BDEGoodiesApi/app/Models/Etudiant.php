<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    // Nom de la table
    protected $table = 'etudiants';

    // Clé primaire
    protected $primaryKey = 'idEtudiant';

    // Champs remplissables
    protected $fillable = [
        'nom',
        'mail',
        'telephone',
    ];

    // Champs non remplissables
    protected $guarded = [
        'idEtudiant',
    ];

    // Champs à cacher dans les réponses JSON
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    // Champs à convertir en types natifs
    protected $casts = [
        'idEtudiant' => 'integer',
        'nom' => 'string',
        'mail' => 'string',
        'telephone' => 'string',
    ];
}
