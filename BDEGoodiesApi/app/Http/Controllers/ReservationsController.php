<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;

class ReservationsController extends Controller
{
    // Méthode pour afficher la liste des réservations
    public function index()
    {
        // Récupérer toutes les réservations
        $reservations = Reservation::all();

        // Retourner la vue avec les réservations
        return response()->json($reservations);
    }

    // Méthode pour afficher une réservation spécifique
    public function show($id)
    {
        // Récupérer une réservation par son ID
        $reservation = Reservation::find($id);

        // Vérifier si la réservation existe
        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], 404);
        }

        // Retourner la vue avec la réservation
        return response()->json($reservation);
    }

    // Méthode pour créer une nouvelle réservation
    public function store(Request $request)
    {
        // Valider les données de la requête
        $validatedData = $request->validate([
            'idEtudiant' => 'required|integer|exists:etudiants,idEtudiant',
            'idEvenement' => 'required|integer|exists:evenements,idEvenement',
            'dateReservation' => 'required|date',
            'statut' => 'required|in:Confirmée,En attente,Annulée',
        ]);

        // Créer une nouvelle réservation
        $reservation = Reservation::create($validatedData);

        // Retourner la vue avec la réservation créée
        return response()->json($reservation, 201);
    }

    // Méthode pour mettre à jour une réservation
    public function update(Request $request, $id)
    {
        // Récupérer une réservation par son ID
        $reservation = Reservation::find($id);

        // Vérifier si la réservation existe
        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], 404);
        }

        // Valider les données de la requête
        $validatedData = $request->validate([
            'idEtudiant' => 'sometimes|required|integer|exists:etudiants,idEtudiant',
            'idEvenement' => 'sometimes|required|integer|exists:evenements,idEvenement',
            'idGoodie' => 'sometimes|required|integer|exists:goodies,idGoodie',
            'quantite' => 'sometimes|required|integer|min:1',
        ]);

        // Mettre à jour la réservation
        $reservation->update($validatedData);

        // Retourner la vue avec la réservation mise à jour
        return response()->json($reservation);
    }

    // Méthode pour supprimer une réservation
    public function destroy($id)
    {
        // Récupérer une réservation par son ID
        $reservation = Reservation::find($id);

        // Vérifier si la réservation existe
        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], 404);
        }

        // Supprimer la réservation
        $reservation->delete();

        // Retourner une réponse de succès
        return response()->json(['message' => 'Réservation supprimée avec succès']);
    }

    // Méthode pour afficher les réservations d'un étudiant
    public function reservationsByEtudiant($idEtudiant)
    {
        // Récupérer les réservations de l'étudiant par son ID
        $reservations = Reservation::where('idEtudiant', $idEtudiant)->get();

        // Vérifier si l'étudiant a des réservations
        if ($reservations->isEmpty()) {
            return response()->json(['message' => 'Aucune réservation trouvée pour cet étudiant'], 404);
        }

        // Retourner la vue avec les réservations de l'étudiant
        return response()->json($reservations);
    }

    // Méthode pour afficher les réservations d'un événement
    public function reservationsByEvenement($idEvenement)
    {
        // Récupérer les réservations de l'événement par son ID
        $reservations = Reservation::where('idEvenement', $idEvenement)->get();

        // Vérifier si l'événement a des réservations
        if ($reservations->isEmpty()) {
            return response()->json(['message' => 'Aucune réservation trouvée pour cet événement'], 404);
        }

        // Retourner la vue avec les réservations de l'événement
        return response()->json($reservations);
    }



    public function getReservationsAvecGoodies($idEvenement)
    {
        $reservations = Reservation::with(['goodies', 'etudiant'])
            ->where('idEvenement', $idEvenement)
            ->get();

        return response()->json($reservations);
    }
}
