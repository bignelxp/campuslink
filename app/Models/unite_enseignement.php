<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class unite_enseignement extends Model
{
    /** @use HasFactory<\Database\Factories\UniteEnseignementFactory> */
    use HasFactory;

     protected $fillable= [
        'nom_ue',
        'semestre_id',
        'niveau',
        'credits',
    ];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function matieres() {
        return $this->hasMany(matiere::class, 'ue_id');
    }
}
