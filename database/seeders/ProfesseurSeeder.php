<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfesseurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $User=User::create([
            'nom'=>'ABOU',
            'prenoms'=>'Robert',
            'tel'=>'0125252525',
            'sex'=>'M',
            'date_naissance'=>'1980-12-10',
            'lieu_naissance'=>'Bohicon',
            'email'=>'abou@abou.com',
            'password'=>'1234',
        ]);
        $User->assignRole('Professeur');
    }
}
