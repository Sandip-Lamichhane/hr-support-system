<?php

namespace Database\Seeders;

use App\Models\Department;
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

        // Make sure there are departments first
        $departments = Department::all();

        if ($departments->isEmpty()) {
            $this->command->info('No departments found, please seed departments first.');
            return;
        }

        User::create([
            'name' => 'Sandip Lamichhane',
            'email' => 'sandip@gmail.com',
            'password' => Hash::make('sandip123'),
            'department_id' => $departments->random()->id,
            'role' => 'Admin',
            'status' => 'Active',
        ]);
    }
}