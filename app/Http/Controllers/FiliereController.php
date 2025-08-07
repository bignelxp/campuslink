<?php

namespace App\Http\Controllers;

use App\Models\filiere;
use App\Http\Requests\StorefiliereRequest;
use App\Http\Requests\UpdatefiliereRequest;
use App\Models\matiere;
use App\Models\semestre;
use App\Models\unite_enseignement;
use Inertia\Inertia;
use phpDocumentor\Reflection\Types\Nullable;


class FiliereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filieres = filiere::all();
        $ues = unite_enseignement::all();
        $matieres = matiere::all();
        $semestres = semestre::all();
        return Inertia::render('filieres/index', [
            'filieres' => $filieres,
            'ues'=>$ues,
            'matieres'=>$matieres,
            'semestres'=>$semestres,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $Semestres=semestre::all();
        return Inertia::render('filieres/create',['Semestres'=>$Semestres]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorefiliereRequest $request)
    {
        $validated_data = $request->validate([
            'nom_filiere' => 'required|string',
            'description_filiere' => 'nullable|string',
            'annee' => ['nullable','in:L1,L2,L3,M1,M2'],
            'semestre' => 'nullable',
            'ues' => ['nullable', 'array'],
            'ues.*.nom_ue' => ['nullable', 'string'],
            'ues.*.credits' => ['nullable', 'string'],
            'ues.*.matieres' => ['nullable', 'array'],
            'ues.*.matieres.*.nom_matiere' => ['nullable', 'string'],
            'ues.*.matieres.*.description' => ['nullable', 'string'],
        ]);

        $filiere = filiere::create([
            'nom_filiere' => $validated_data['nom_filiere'],
            'description_filiere' => $validated_data['description_filiere'] ?? null,
        ]);

        $ues = $request->input('ues', []);
        foreach ($ues as $ue) {
            if (!empty($ue['nom_ue'])) {
                $ue_registered = unite_enseignement::create([
                    'nom_ue' => $ue['nom_ue'],
                    'credits' => $ue['credits'],
                    'niveau' => $request->annee,
                    'semestre_id' => $request->semestre,
                    'filiere_id' => $filiere->id,
                ]);
                $matieres = $ue['matieres'] ?? [];
                foreach ($matieres as $matiere) {
                    if (!empty($matiere['nom_matiere'])) {
                        matiere::create([
                            'nom_mat' => $matiere['nom_matiere'],
                            'description_mat' => $matiere['description'],
                            'ue_id' => $ue_registered->id,
                            'semestre_id' => $ue_registered->semestre_id,
                        ]);
                    }
                }
            }
        }

        return redirect()->route('filiere.index')->with('success', 'Filière créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show($filiereId)
    {
        $filiere = filiere::with(['ues.matieres'])->findOrFail($filiereId);

        $grouped = $filiere->ues->groupBy('niveau')->map(function($ues){
            return $ues->map(function($ue){
                return [
                    'id' => $ue->id,
                    'nom' => $ue->nom_ue,
                    'credits' => $ue->credits,
                    'matieres' => $ue->matieres->map(function($matiere) {
                        return [
                            'id' => $matiere->id,
                            'nom' => $matiere->nom_mat,
                            'description' => $matiere->description_mat,
                        ];
                    }),
                ];
            });
        });

        return inertia('filieres/Formation', [
            'filiere' => [
                'id' => $filiere->id,
                'nom' => $filiere->nom_filiere,
            ],
            'ueParNiveau' => $grouped,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(filiere $filiere)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatefiliereRequest $request, filiere $filiere)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(filiere $filiere)
    {
        //
    }

}
    /**
     * Remove the specified resource from storage.
     */

