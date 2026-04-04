<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Settings\CategoryController;
use App\Http\Controllers\Settings\DepartmentController;
use App\Http\Controllers\Ticket\TicketController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/users', [UserController::class, 'GetUser'])->name('GetUsers');

    Route::post('/users', [UserController::class, 'StoreUser'])->name('StoreUsers');
    Route::put('/users/{user}', [UserController::class, 'UpdateUser'])->name('UpdatUsers');

    Route::get('/departments', [DepartmentController::class, 'GetDepartment'])->name('getDepartments');
    Route::post('/departments', [DepartmentController::class, 'StoreDepartment'])->name('storeDepartments');

    Route::get('/category', [CategoryController::class, 'GetCategory'])->name('getCategories');
    Route::post('/category', [CategoryController::class, 'StoreCategory'])->name('StoreCategory');
    Route::put('/category/{id}', [CategoryController::class, 'UpdateCategory']);
    Route::patch('/category/{id}/status', [CategoryController::class, 'UpdateCategoryStatus']);

    Route::post('/tickets', [TicketController::class, 'StoreTicket']);
    Route::get('/tickets', [TicketController::class, 'GetTickets']);
    Route::get('/tickets/{ticket_number}', [TicketController::class, 'GetTicket']);
    Route::post('/tickets/{ticket_number}/update', [TicketController::class, 'UpdateTicket']);
    Route::put('/tickets/{ticket_number}', [TicketController::class, 'UpdateTicket']);
    Route::patch('/tickets/{ticket_number}/assign', [TicketController::class, 'AssignTicket']);
    Route::post('/ai-suggest', [TicketController::class, 'AiSuggest']);
});

// Temporary: Allow public access to ticket endpoints for development
Route::get('/tickets', [TicketController::class, 'GetTickets']);
Route::get('/tickets/{ticket_number}', [TicketController::class, 'GetTicket']);
Route::post('/tickets/{ticket_number}/update', [TicketController::class, 'UpdateTicket']);
Route::get('/category', [CategoryController::class, 'GetCategory'])->name('getCategories');
Route::get('/departments', [DepartmentController::class, 'GetDepartment'])->name('getDepartments');
Route::get('/users', [UserController::class, 'GetUser'])->name('GetUsers');