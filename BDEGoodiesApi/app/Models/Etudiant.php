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
    public $timestamps = false;

    // Champs à convertir en types natifs
    protected $casts = [
        'idEtudiant' => 'integer',
        'nom' => 'string',
        'mail' => 'string',
        'telephone' => 'string',
    ];

    public function evenements()
    {
        return $this->belongsToMany(Evenement::class, 'reservations', 'idEtudiant', 'idEvenement')
            ->withPivot('dateReservation', 'statut');
    }   

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'idEtudiant');
    }

    public static function boot()
    {
        parent::boot();
        
        static::deleting(function($etudiant) {
            $etudiant->reservations()->delete();
        });
    }
}
