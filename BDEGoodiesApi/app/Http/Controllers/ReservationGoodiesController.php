<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReservationGoodie;

class ReservationGoodiesController extends Controller
{
    // Function to handle the reservation of goodies
    public function reserveGoodies(Request $request)
    {
        // Valider les données de la requête
        $validatedData = $request->validate([
            'idReservation' => 'required|exists:reservations,idReservation',
            'idGoodie' => 'required|exists:goodies,idGoodie',
            'quantite' => 'required|integer|min:1',
        ]);

        // Créer une nouvelle instance de ReservationGoodie
        $reservationGoodie = new ReservationGoodie();
        $reservationGoodie->idReservation = $validatedData['idReservation'];
        $reservationGoodie->idGoodie = $validatedData['idGoodie'];
        $reservationGoodie->quantite = $validatedData['quantite'];
        $reservationGoodie->save();

        return response()->json(['message' => 'Goodie réservé avec succès!'], 201);
    }
}
