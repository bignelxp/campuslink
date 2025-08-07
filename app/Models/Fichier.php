<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fichier extends Model
{
    /** @use HasFactory<\Database\Factories\FichierFactory> */
    use HasFactory;

     protected $fillable= [
        'nom_file',
        'type_file',
        'description_file',
        'url_file',
        'user_id',
        'matiere_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


