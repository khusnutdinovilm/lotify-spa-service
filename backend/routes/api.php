<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LotController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/lots', [LotController::class, 'index']);
Route::post('/lots', [LotController::class, 'store']);
Route::match(['put', 'post'], '/lots/{id}', [LotController::class, 'update']);
Route::delete('/lots/{id}', [LotController::class, 'destroy']);
