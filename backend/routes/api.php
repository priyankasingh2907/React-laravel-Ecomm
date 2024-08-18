<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',[userController::class,'register']);

Route::post('/login',[userController::class,'login']);

Route::post('/storeProduct',[ItemController::class,'store']);

Route::get('/show',[ItemController::class,'index']);
Route::get('/search/{key}',[ItemController::class,'search']);

Route::get('/show/{id}',[ItemController::class,'show']);


Route::post('/edit/{id}',[ItemController::class,'edit']);


Route::post('/update/{id}',[ItemController::class,'update']);


Route::delete('/delete/{id}',[ItemController::class,'destroy']);

