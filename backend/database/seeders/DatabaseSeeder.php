<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\Category\CategorySeeder;
use Database\Seeders\Department\DepartmentSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //call department seeder
        $this->call(DepartmentSeeder::class);

        //call category seeder
        $this->call(CategorySeeder::class);
        
        //call User Seeder
        $this->call(Userseeder::class);
    }
}
