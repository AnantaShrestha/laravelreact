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

//permission api routes
$router->prefix('admin')->name('admin.')->group(function() use($router){
    //authentication
    $router->post('login',['as'=>'login','uses'=>'AuthController@login'])->withoutMiddleware('api');
    $router->get('logout',['as'=>'logout','uses'=>'AuthController@logout']);
    //permission routes
    $router->prefix('permission')->name('permission.')->group(function() use($router){
        $router->get('/',['as'=>'index','uses'=>'PermissionController@index']);
        $router->post('store',['as'=>'store','uses'=>'PermissionController@store']);
        $router->get('edit/{id}',['as'=>'edit','uses'=>'PermissionController@edit']);
        $router->put('edit/{id}',['as'=>'update','uses'=>'PermissionController@update']);
        $router->delete('delete/{id}',['as'=>'delete','uses'=>'PermissionController@delete']);
        $router->get('route/list',['as'=>'permissionroutelist','uses'=>'PermissionController@permissionRouteList']);
    });
    //role routes
    $router->prefix('role')->name('role.')->group(function() use($router){
        $router->get('/',['as'=>'index','uses'=>'RoleController@index']);
        $router->post('store',['as'=>'store','uses'=>'RoleController@store']);
        $router->get('edit/{id}',['as'=>'edit','uses'=>'RoleController@edit']);
        $router->put('edit/{id}',['as'=>'update','uses'=>'RoleController@update']);
        $router->delete('delete',['as'=>'delete','uses'=>'RoleController@delete']);
    });
});
