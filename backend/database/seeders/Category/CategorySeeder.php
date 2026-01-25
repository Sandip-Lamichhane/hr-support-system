<?php

namespace Database\Seeders\Category;

use App\Models\category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        category::create([
            'name' => 'Technical',
            'description' => 'Technical',
        ]);
    }
}
