<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\Fichier;
use App\Http\Requests\StoreFichierRequest;
use App\Http\Requests\UpdateFichierRequest;
use Inertia\Inertia;

class FichierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function index(Request $request)
    {
        if ($request->query('version')=='mesFichiers'){
            $user_id=Auth::id();
            $fichiers = Fichier::where('user_id',$user_id)->orderBy('created_at', 'desc')->get();

        }
        else {
            $fichiers = Fichier::orderBy('created_at', 'desc')->get();            
        }


        return Inertia::render("fichier/index",[
            'fichiers' => $fichiers
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return Inertia::render( "fichier/create");
    }

    /**
     * Store a newly created resource in storage.
     */
     public function store(Request $request): RedirectResponse
    {
        
        $request->validate([
            'nom_file' => 'required|string',
            'url_file' => 'required|file',
            'type_file' => 'in:pdf,docx,pptx,xlx,csv',
            'description_file' => 'nullable|string',
        ]);
        $user=auth()->user();
        // Stocker le fichier et récupérer le chemin
        $file = $request->file('url_file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('uploads'), $filename);
        

       $fichier = Fichier::create([
            "nom_file" => $request->nom_file,
            "type_file" => $request->type_file,
            "url_file" => $filename, // <-- ici on stocke le chemin du fichier
            "description_file" => $request->description_file,
            "user_id"=> $user->id,
        ]);

        // annonce automatique après soumission
        Announcement::create([
            'title'=> '✨📄 Nouvelle ressource en ligne',
            'content'=>'L\'étudiant ' . auth()->user()->prenoms. ' a soumis un fichier : ' . $fichier->description_file,
            'type'=> 'automatique',
            'target_audience' => json_encode(['all']),
            'created_by' => null, // système
            'related_file_id' => $fichier->id,
        ]);
        return to_route('fichier.index',"Fichier soumis avec succès 🧑‍🎓");
   
    }
    /**
     * Display the specified resource.
     */
    public function show(Fichier $fichier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fichier $fichier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFichierRequest $request, Fichier $fichier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fichier $fichier)
    {
        //
        if ($fichier->user_id !== Auth::id()) {
            abort(403,'Action non autorisée.');
        }

        $file_path = public_path('uploads/'.$fichier->url_file);
        if (file_exists($file_path)) {
            unlink($file_path);

        }

        $fichier->delete();

        return redirect()->route('fichier.index')->with('success','Fichier suprimé avec succès');
    }

    public function mesFichiers(){
        $user_id = Auth::id();
        $fichiers = Fichier::where('user_id',$user_id)
                    ->orderBy('created_at','desc')
                    ->get();
        return Inertia::render('fichier/mesFichiers',[
            'fichiers'=>$fichiers
        ]);

    }
}
