<?php

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

Route::middleware('auth:api')->get('/me', function (Request $request) {
    return $request->user();
});

Route::post('/register', App\Http\Controllers\api\v1\PostRegister::class)->name('register');
Route::post('/login', App\Http\Controllers\api\v1\PostLogin::class)->name('login');
Route::post('/logout', App\Http\Controllers\api\v1\PostLogout::class)->name('logout');

Route::post('/requestLists', [App\Http\Controllers\api\v1\PostLists::class, 'addData']);
Route::get('/getLists', [App\Http\Controllers\api\v1\PostLists::class, 'getData']);
Route::put('/editLists', [App\Http\Controllers\api\v1\PostLists::class, 'updateData']);
Route::delete('/getLists', [App\Http\Controllers\api\v1\PostLists::class, 'destroy']);

Route::post('/requestCards', [App\Http\Controllers\api\v1\PostCards::class, 'addData']);
Route::get('/getCards', [App\Http\Controllers\api\v1\PostCards::class, 'getData']);
Route::put('/editCards', [App\Http\Controllers\api\v1\PostCards::class, 'updateData']);
Route::delete('/deleteCards', [App\Http\Controllers\api\v1\PostCards::class, 'destroy']);