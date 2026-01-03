<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function Department()
    {
        $department = Department::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => 'true',
            'data' => $department
        ]);
    }
}