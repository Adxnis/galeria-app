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
use App\Http\Controllers\UserController;
use App\Http\Controllers\DiscoveryController;
use App\Http\Controllers\SharedAlbumController;
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
    Route::put('updateInfo', [AuthController::class, 'updateInfo']);
    Route::apiResource('album', AlbumController::class);
    Route::apiResource('photo', PhotoController::class);
    Route::apiResource('comment', CommentController::class);
    Route::apiResource('like', LikeController::class);
    Route::apiResource('tag', TagController::class);
    Route::apiResource('shared', SharedAlbumController::class);
    Route::get('userPhotos', [PhotoController::class, 'getUserPhotos']);
    Route::get('searchByTags/{id}', [PhotoController::class, 'searchByTags']);
    Route::get('userAlbums', [AlbumController::class, 'getUserAlbums']);
    Route::get('sharedAlbums', [AlbumController::class, 'getSharedAlbums']);
    Route::post('upload', [ImageController::class, 'upload']);
    Route::get('getUsers', [UserController::class, 'getUsers']);
    Route::get('getUser', [UserController::class, 'getUser']);
    Route::get('search/{id}', [UserController::class, 'search']);
    Route::get('getCommentsFromPhoto/{id}', [CommentController::class, 'getCommentsFromPhoto']);
    Route::get('getPublicPhotos', [DiscoveryController::class, 'index']);
    Route::get('hidePhotos', [DiscoveryController::class, 'hidePhotos']);
    Route::get('showPhotos', [DiscoveryController::class, 'showPhotos']);
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);




