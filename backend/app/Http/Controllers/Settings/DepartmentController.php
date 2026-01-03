<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function GetDepartment()
    {
        $department = Department::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => 'true',
            'data' => $department
        ]);
    }

    public function StoreDepartment(Request $request)
    {
        $validated = $request -> validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:Active,Inactive',
        ]);

        $department = Department::create($validated);

        return response()->json([
            'message' => 'Department added successfull.',
            'department' => $department,
        ], 201);
    }
}