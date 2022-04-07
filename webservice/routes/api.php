<?php

use App\Http\Controllers\JwtAuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
                 'middleware' => 'api',
                 'prefix' => 'auth',
                 'as' => 'auth.',
             ], function ($router) {
    /** @deprecated registration is not available. Every user should be added from admin panel */
    Route::post('/signup', [JwtAuthController::class, 'register']);
    Route::post('/signin', [JwtAuthController::class, 'login']);
    Route::get('/me', [JwtAuthController::class, 'profile']);
    Route::post('/token-refresh', [JwtAuthController::class, 'refresh']);
    Route::post('/signout', [JwtAuthController::class, 'signout']);
});

Route::group(['middleware' => 'auth'],   function ($router) {
    // Resources
    Route::apiResource('user', UserController::class);
    Route::apiResource('worker', WorkerController::class);
});
