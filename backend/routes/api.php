<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Settings\CategoryController;
use App\Http\Controllers\Settings\DepartmentController;
use App\Http\Controllers\Ticket\TicketController;
use App\Http\Controllers\User\UserController;
use App\Models\category;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/users', [UserController::class, 'GetUser'])->name('GetUsers');
    Route::post('/users', [UserController::class, 'StoreUser'])->name('StoreUsers');
    Route::put('/users/{user}', [UserController::class, 'UpdateUser'])->name('UpdatUsers');

    Route::get('/departments', [DepartmentController::class, 'GetDepartment'])->name('getDepartments');
    Route::post('/departments', [DepartmentController::class, 'StoreDepartment'])->name('storeDepartments');

    Route::get('/category', [CategoryController::class, 'GetCategory'])->name('getCategories');
    Route::post('/category', [CategoryController::class, 'StoreCategory'])->name('StoreCategory');
    Route::put('/category/{id}', [CategoryController::class, 'UpdateCategory'])->name('updateCategory');
    Route::patch('/category/{id}/status', [CategoryController::class, 'UpdateCategoryStatus'])->name('UpdateCategoryStatus');

    Route::get('/tickets', [TicketController::class, 'GetTickets']);
    Route::post('/tickets', [TicketController::class, 'StoreTicket']);
});
