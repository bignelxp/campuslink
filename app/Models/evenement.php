<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class evenement extends Model
{
    /** @use HasFactory<\Database\Factories\EvenementFactory> */
    use HasFactory;

    protected $fillable= [
        'nom_event',
        'description_event',
        'dateheure',
        'utilisateur_id',
    ];
}
