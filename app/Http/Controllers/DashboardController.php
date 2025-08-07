<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Fichier;
use App\Models\Announcement;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'userCount' => User::count(),
            'fileCount' => Fichier::count(),
            'announcements' => Announcement::latest()->take(5)->get(),
            'announcementCount' => Announcement::count(),
            'filesByDay' => Fichier::selectRaw('DATE(created_at) as day, COUNT(*) as total')
                ->groupBy('day')
                ->orderBy('day', 'desc')
                ->take(7)
                ->get()
                ->reverse()
                ->values(),
            'announcementsByDay' => Announcement::selectRaw('DATE(created_at) as day, COUNT(*) as total')
                ->groupBy('day')
                ->orderBy('day', 'desc')
                ->take(7)
                ->get()
                ->reverse()
                ->values(),
        ]);
    }
} 
