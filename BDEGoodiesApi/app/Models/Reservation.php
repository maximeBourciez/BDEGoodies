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

    public $timestamps = false;

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
    
// In your ReservationsController
public function checkExisting(Request $request)
{
    $request->validate([
        'studentId' => 'required|integer',
        'eventId' => 'required|integer'
    ]);

    $exists = Reservation::where('idEtudiant', $request->studentId)
                        ->where('idEvenement', $request->eventId)
                        ->exists();

    return response()->json($exists);
}}
