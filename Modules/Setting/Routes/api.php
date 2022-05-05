<?php

use Illuminate\Http\Request;

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
$router->prefix('admin')->name('admin.')->group(function() use($router){ 
    $router->prefix('log')->name('log.')->group(function() use($router){
        $router->get('/',['as'=>'index','uses'=>'LogController@index']);
    });
});