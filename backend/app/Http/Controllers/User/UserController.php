<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function GetUser()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function StoreUser(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'department_id' => 'required|exists:departments,id',
            'role' => 'required|in:User,Admin',
            'status' => 'required|in:Active,Inactive,Pending',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'department_id' => $request->department_id,
            'role' => $request->role,
            'status' => $request->status,
        ]);

        $user->load('department');

        return response()->json([
            'message' => 'User created successfully!',
            'user' => $user
        ], 201);
    }

    public function UpdateUser(Request $request, User $user)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|exists:departments,id',
            'role' => 'required|in:User,Admin',
            'status' => 'required|in:Active,Inactive,Pending',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'User updated succesfully!',
            'user' => $user
        ]);
    }
}
