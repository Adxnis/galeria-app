<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;

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

Route::middleware('auth:sanctum')->group(function() {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('album', AlbumController::class);
    Route::apiResource('photo', PhotoController::class);
    Route::apiResource('comment', CommentController::class);
    Route::apiResource('like', LikeController::class);
    Route::apiResource('tag', TagController::class);
    Route::get('userPhotos', [PhotoController::class, 'getUserPhotos']);
    Route::post('upload', [ImageController::class, 'upload']);

});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


