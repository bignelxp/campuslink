<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\unite_enseignement;
class filiere extends Model
{
    /** @use HasFactory<\Database\Factories\FiliereFactory> */
    use HasFactory;
    /**
 * @property \Illuminate\Database\Eloquent\Collection|\App\Models\unite_enseignement[] $ues
 */



     protected $fillable= [
        'id',
        'nom_filiere',
        'description_filiere',
        'created_at',
        'updated_at',

    ];
    
    public function ues() {
        return $this->hasMany(unite_enseignement::class, 'filiere_id');
    }


}
