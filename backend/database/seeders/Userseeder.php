<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class Userseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Sandip Lamichhane',
            'email' => 'sandip@gmail.com',
            'password' => Hash::make('sandip123'),
            'role' => 'Admin',
            'status' => 'Active',
        ]);
    }
}