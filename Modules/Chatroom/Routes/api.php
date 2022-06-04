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
    $router->prefix('chat')->name('chat.')->group(function() use($router){
        $router->get('online',['as'=>'getonlineUser','uses'=>'MessageController@getonlineUser']);
        $router->get('/{id}',['as'=>'getConversation','uses'=>'MessageController@getConversation']);
        $router->post('store',['as'=>'sendMessage','uses'=>'MessageController@sendMessage']);
       
    });
});

