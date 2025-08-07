<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class coordonnateurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $User=User::create([
            'nom'=> 'KALA',
            'prenoms'=>'Tom',
            'sex'=>'U',
            'email'=>'tom@tom.com',
            'password'=>Hash::make("1234"),
            'tel'=>'0100000000',
            'date_naissance'=>'1999-01-01',
            'lieu_naissance'=>'benin',
            

        ]);
        $User->assignRole("coordonnateur");
    }
}
