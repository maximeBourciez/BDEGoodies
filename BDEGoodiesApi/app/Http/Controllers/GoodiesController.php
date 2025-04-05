<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goodie;

class GoodiesController extends Controller
{
    /**
     * Affiche la liste des goodies.
     */
    public function index()
    {
        return response()->json(Goodie::all());
    }

    /**
     * Affiche un goodie spécifique.
     */
    public function show($id)
    {
        $goodie = Goodie::find($id);
        
        if (!$goodie) {
            return response()->json(['message' => 'Goodie non trouvé'], 404);
        }

        return response()->json($goodie);
    }

    /**
     * Crée un nouveau goodie.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'quantite' => 'required|integer|min:0',
            'description' => 'nullable|string|max:1000',
            'coutUnitaire' => 'nullable|numeric|min:0',
        ]);

        $goodie = Goodie::create($validated);
        
        return response()->json($goodie, 201);
    }

    /**
     * Met à jour un goodie existant.
     */
    public function update(Request $request, $id)
    {
        $goodie = Goodie::find($id);
        
        if (!$goodie) {
            return response()->json(['message' => 'Goodie non trouvé'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'quantity' => 'sometimes|integer|min:0',
        ]);

        $goodie->update($validated);
        
        return response()->json($goodie);
    }

    /**
     * Supprime un goodie.
     */
    public function destroy($id)
    {
        $goodie = Goodie::find($id);
        
        if (!$goodie) {
            return response()->json(['message' => 'Goodie non trouvé'], 404);
        }

        $goodie->delete();
        
        return response()->json(['message' => 'Goodie supprimé']);
    }
}