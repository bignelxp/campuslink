<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class matiere extends Model
{
    /** @use HasFactory<\Database\Factories\MatiereFactory> */
    use HasFactory;

     protected $fillable= [
        'nom_mat',
        'description_mat',
        'ue_id',
        'semestre_id',
    ];

    public function ue()
    {
        return $this->belongsTo(unite_enseignement::class);
    }
}
