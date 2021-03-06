<?php

use App\Http\Controllers\AccessController;
use App\Http\Controllers\AccessRuleController;
use App\Http\Controllers\JwtAuthController;
use App\Http\Controllers\LockController;
use App\Http\Controllers\LockGroupController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\TeamController;
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

Route::put('/access/{device_key}', [AccessController::class, 'enter'])->name('access.enter');

Route::group(['middleware' => 'auth'],   function ($router) {
    // Non-resource routes
    Route::post('/team-control', [TeamController::class, 'attach'])->name('team.attach');
    Route::post('/team-control/detach', [TeamController::class, 'detach'])->name('team.detach');
    Route::post('/rule-control', [AccessRuleController::class, 'attach'])->name('rule.attach');
    Route::post('/rule-control/detach', [AccessRuleController::class, 'detach'])->name('rule.detach');
    Route::post('/lock-control', [LockGroupController::class, 'attach'])->name('lock_group.attach');
    Route::post('/lock-control/detach', [LockGroupController::class, 'detach'])->name('lock_group.detach');


    // Resources
    Route::apiResource('user', UserController::class);
    Route::apiResource('lock', LockController::class);
    Route::apiResource('team', TeamController::class);
    Route::apiResource('worker', WorkerController::class);
    Route::apiResource('lock_group', LockGroupController::class);
    Route::apiResource('access_rule', AccessRuleController::class);
    Route::apiResource('access_log', LogController::class);
});
