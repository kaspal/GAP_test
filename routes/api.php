<?php

use Illuminate\Http\Request;
Use App\Store;
Use App\Article;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('stores', 'StoreController@index');
Route::get('stores/{id}', 'StoreController@show');
Route::post('stores/create', 'StoreController@store');
Route::put('stores/update/', 'StoreController@update');
Route::delete('stores/delete/{id}', 'StoreController@softDelete');

Route::get('articles', 'ArticleController@index');
Route::get('articles/{id}', 'ArticleController@show');
Route::post('articles/create', 'ArticleController@store');
Route::put('articles/update/', 'ArticleController@update');
Route::delete('articles/delete/{id}', 'ArticleController@softDelete');
Route::get('articles/store/{id}', 'ArticleController@findByStore');
