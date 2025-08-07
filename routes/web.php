<?php
use App\Http\Controllers\FichierController;
use App\Http\Controllers\FiliereController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\MatiereController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
});

Route::resource('fichier',FichierController::class);

Route::get('announcements/index', [AnnouncementController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('announcements.index');

Route::get('/announcements/create', [AnnouncementController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('announcements.create');


Route::post('/announcements', [AnnouncementController::class, 'store'])->name('announcements.store');





Route::resource('matiere', MatiereController::class);

Route::resource('filiere',FiliereController::class);

Route::resource('unite_enseignement',MatiereController::class);

Route::get('fichier/mesFichiers',function(){

})->name('mesFichiers');


Route::get('/filieres/{id}/formation', [FiliereController::class, 'show'])
    ->name('filieres.formation');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
