<?php

namespace App\Http\Controllers;

use App\Models\Fichier;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Announcement;
use Inertia\Inertia;
use App\Http\Requests\UpdateFichierRequest;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::orderBy('created_at', 'desc')->get();
        $fichiers = Fichier::all();
        $users = User::all();
        return Inertia::render('announcements/index', [
            'announcements' => $announcements,
            'fichiers'=> $fichiers,
            'users'=>$users,
        ]);
    }

    public function store(Request $request)
    {
    $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
    ]);

    Announcement::create([
        'title' => $request->title,
        'content' => $request->input('content'),
        'type' => 'manuel',
        'created_by' => auth()->user()->prenoms.' '. auth()->user()->nom,
        'target_audience' => json_encode(['tous']), // ou spécifique selon besoin
    ]);



    return redirect()->route('announcements.index')->with('success', 'Annonce publiée avec succès.');
}
    public function create()
    {
        return Inertia::render('announcements/create');
    }

}
