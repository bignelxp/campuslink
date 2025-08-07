<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Administration extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $User=User::create([
            'nom'=>'Admin',
            'prenoms'=>'Admin',
            'tel'=>'101010101',
            'sex'=>'M',
            'date_naissance'=>'2000-01-01',
            'lieu_naissance'=>'Cotonou',
            'email'=>'admin@admin.com',
            'password'=>'ABCD',
        ]);
        $User->assignRole('Administration');
    
    }
}
