<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function GetCategory()
    {
        $category = category::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => 'true',
            'data' => $category,
        ]);
    }

    public function StoreCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:Active,Inactive',
        ]);

        $category = category::create($validated);

        return response()->json([
            'message' => 'Category created succesfully.',
            'data' => $category,
        ], 201);
    }

    public function UpdateCategory(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category = category::findOrFail($id);
        $category->update($validated);

        return response()->json([
            'message' => 'Category updated',
            'data' => $category,
        ]);
    }

    public function UpdateCategoryStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:Active,Inactive',
        ]);

        $category = category::findOrFail($id);
        $category->update($validated);

        return response()->json([
            'message' => 'Status updated',
            'data' => $category,
        ]);
    }
}