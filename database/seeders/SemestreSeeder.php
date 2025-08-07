<?php

namespace Database\Seeders;

use App\Models\semestre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SemestreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $Semestre=semestre::create([
            'nom_semestre'=>'Semestre 1',	
            'cycle'=>'L1',
        ]);
            $Semestre=semestre::create([
            'nom_semestre'=>'Semestre 2',	
            'cycle'=>'L1',
        ]);
        $Semestre=semestre::create([
            'nom_semestre'=>'Semestre 3',	
            'cycle'=>'L2',
        ]);
        $Semestre=semestre::create([
            'nom_semestre'=>'Semestre 4',	
            'cycle'=>'L2',
        ]);
        $Semestre=semestre::create([
            'nom_semestre'=>'Semestre 5',	
            'cycle'=>'L3',
        ]);
        $Semestre=semestre::create([
            'nom_semestre'=>'Semestre 6',	
            'cycle'=>'L3',
        ]);
            $Semestre=semestre::create([
            'nom_semestre'=>'Semestre 1',	
            'cycle'=>'M1',
        ]);
            $Semestre=semestre::create([
            'nom_semestre'=>'Semestre 2',	
            'cycle'=>'M1',
        ]);
            $Semestre=semestre::create([
            'nom_semestre'=>'Semestre 3',	
            'cycle'=>'M2',
        ]);
            $Semestre=semestre::create([
            'nom_semestre'=>'Semestre 4',	
            'cycle'=>'M2',
        ]);
    }
}
