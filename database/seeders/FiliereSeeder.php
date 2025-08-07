<?php

namespace Database\Seeders;

use App\Models\filiere;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FiliereSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $Filiere=filiere::create([
            'nom_filiere'=>'Informatique de gestion',
            'description_filiere'=>'Enseignement des méthodes informatiques appliquées à la gestion des entreprises',
        ]);
        
    }
}
