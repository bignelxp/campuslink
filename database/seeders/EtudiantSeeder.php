<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EtudiantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $User=User::create([
            'nom'=>'COFFI',
            'prenoms'=>'Gildas',
            'tel'=>'0110101010',
            'sex'=>'M',
            'date_naissance'=>'2007-12-23',
            'lieu_naissance'=>'Natitingou',
            'email'=>'coffi@coffi.com',
            'password'=>'1234',   
        ]);
        $User->assignRole('Etudiant');
    }
}
