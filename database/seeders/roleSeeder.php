<?php

namespace Database\Seeders;

use Attribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class roleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'name'=>'Etudiant'    
        ]);
        Role::create([
            'name'=>'Professeur'
        ]);
        Role::create([
            'name'=>'Administration'
        ]);
        Role::create([
            'name'=>'Presse'
        ]);
        Role::create([
            'name'=>'coordonnateur'
        ]);
    }
}
