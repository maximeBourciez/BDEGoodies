<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;

class EtudiantsController extends Controller
{
    // Méthode pour afficher la liste des étudiants
    public function index(){
        // Récupérer tous les étudiants
        $etudiants = Etudiant::all();

        // Retourner la vue avec les étudiants
        return response()->json($etudiants);
    }

    // Méthode pour créer un nouvel étudiant
    public function show($id){
        // Récupérer un étudiant par son ID
        $etudiant = Etudiant::find($id);

        // Vérifier si l'étudiant existe
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant non trouvé'], 404);
        }

        // Retourner la vue avec l'étudiant
        return response()->json($etudiant);
    }

    // Méthode pour créer un nouvel étudiant
    public function store(Request $request){
        // Valider les données de la requête
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'mail' => 'required|email|unique:etudiants,email',
            'telephone' => 'required|string|max:15',
        ]);

        // Créer un nouvel étudiant
        $etudiant = Etudiant::create($validatedData);

        // Retourner la vue avec l'étudiant créé
        return response()->json($etudiant, 201);
    }

    // Méthode pour mettre à jour un étudiant
    public function update(Request $request, $id){
        // Récupérer un étudiant par son ID
        $etudiant = Etudiant::find($id);

        // Vérifier si l'étudiant existe
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant non trouvé'], 404);
        }

        // Valider les données de la requête
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'mail' => 'required|email|unique:etudiants,email',
            'telephone' => 'required|string|max:15',
        ]);

        // Mettre à jour l'étudiant
        $etudiant->update($validatedData);

        // Retourner la vue avec l'étudiant mis à jour
        return response()->json($etudiant);
    }

    // Méthode pour supprimer un étudiant
    public function destroy($id){
        // Récupérer un étudiant par son ID
        $etudiant = Etudiant::find($id);

        // Vérifier si l'étudiant existe
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant non trouvé'], 404);
        }

        // Supprimer l'étudiant
        $etudiant->delete();

        // Retourner une réponse de succès
        return response()->json(['message' => 'Etudiant supprimé avec succès']);
    }

    
}
