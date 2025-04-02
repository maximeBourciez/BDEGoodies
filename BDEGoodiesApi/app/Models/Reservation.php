<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    // Nom de la table
    protected $table = 'reservations';

    // Clé primaire
    protected $primaryKey = 'idReservation';

    // Champs remplissables
    protected $fillable = [
        'idEtudiant',
        'idEvenement',
        'dateReservation',
        'statut'
    ];

    // Champs non remplissables
    protected $guarded = [
        'idReservation',
    ];

    // Champs à cacher dans les réponses JSON
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    // Champs à convertir en types natifs
    protected $casts = [
        'idReservation' => 'integer',
        'idEtudiant' => 'integer',
        'idEvenement' => 'integer',
        'dateReservation' => 'datetime',
        'statut' => 'string',
    ];

    // Relation avec le modèle Etudiant
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'idEtudiant');
    }

    public function evenement()
    {
        return $this->belongsTo(Evenement::class, 'idEvenement');
    }

    public function goodies()
    {
        return $this->belongsToMany(Goodie::class, 'reservation_goodies', 'idReservation', 'idGoodie')
            ->withPivot('quantite');
    }
}
