<?php


if(!function_exists('currentUser')){
	function currentUser(){
		return \JWTAuth::parseToken()->authenticate();
	}
}