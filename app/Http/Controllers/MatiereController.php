<?php

namespace App\Http\Controllers;

use App\Models\matiere;
use App\Http\Requests\StorematiereRequest;
use App\Http\Requests\UpdatematiereRequest;
use App\Models\unite_enseignement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatiereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $ueId = $request->query('ue_id');
        $ue = unite_enseignement::findOrFail($ueId);

        return Inertia()::render('Matiere/Create', [
            'ue' => $ue,
        ]);

    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unite_enseignement_id' => 'required|exists:unite_enseignements,id',
        ]);

        Matiere::create($request->all());

        return redirect()->route('filiere.index')->with('success','Matière ajoutée avec succès.');

    
    }

    /**
     * Display the specified resource.
     */
    public function show(matiere $matiere)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(matiere $matiere)
    {
        //
        return Inertia::render('Matiere/Edit', [
        'matiere' => $matiere,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatematiereRequest $request, matiere $matiere)
    {
        //
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

         $matiere->update($request->only('nom', 'description'));

        return redirect()->route('filiere.index')->with('success', 'Matière modifiée avec succès.');

        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(matiere $matiere)
    {
        //
        $matiere->delete();

        return redirect()->route('filiere.index')->with('success', 'Matière supprimée.');
    }
}
