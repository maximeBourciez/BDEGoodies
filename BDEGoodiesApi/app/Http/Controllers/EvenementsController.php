<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evenement;

class EvenementsController extends Controller
{
    // Méthode pour afficher la liste des événements
    public function index()
    {
        // Récupérer tous les événements
        $evenements = Evenement::all();

        // Retourner la vue avec les événements
        return response()->json($evenements);
    }

    // Méthode pour afficher un événement spécifique
    public function show($id)
    {
        // Récupérer un événement par son ID
        $evenement = Evenement::find($id);

        // Vérifier si l'événement existe
        if (!$evenement) {
            return response()->json(['message' => 'Événement non trouvé'], 404);
        }

        // Retourner la vue avec l'événement
        return response()->json($evenement);
    }

    // Méthode pour créer un nouvel événement
    public function create(Request $request)
    {
        // Valider les données de la requête
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'date' => 'required|date',
            'lieu' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Créer un nouvel événement
        $evenement = Evenement::create($validatedData);

        // Retourner la vue avec l'événement créé
        return response()->json($evenement, 201);
    }

    // Méthode pour mettre à jour un événement
    public function update(Request $request, $id)
    {
        // Récupérer un événement par son ID
        $evenement = Evenement::find($id);

        // Vérifier si l'événement existe
        if (!$evenement) {
            return response()->json(['message' => 'Événement non trouvé'], 404);
        }

        // Valider les données de la requête
        $validatedData = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'date' => 'sometimes|required|date',
            'lieu' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Mettre à jour l'événement
        $evenement->update($validatedData);

        // Retourner la vue avec l'événement mis à jour
        return response()->json($evenement);
    }

    // Méthode pour supprimer un événement
    public function destroy($id)
    {
        // Récupérer un événement par son ID
        $evenement = Evenement::find($id);

        // Vérifier si l'événement existe
        if (!$evenement) {
            return response()->json(['message' => 'Événement non trouvé'], 404);
        }

        // Supprimer l'événement
        $evenement->delete();

        // Retourner une réponse de succès
        return response()->json(['message' => 'Événement supprimé avec succès']);
    }


    public function getEtudiantsInscrits($idEvenement)
    {
        $evenement = Evenement::with(['etudiants' => function ($query) {
            $query->withPivot('dateReservation', 'statut');
        }])->find($idEvenement);

        if (!$evenement) {
            return response()->json(['message' => 'Événement non trouvé'], 404);
        }

        return response()->json($evenement->etudiants);
    }
    
}
