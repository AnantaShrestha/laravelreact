<?php


if(!function_exists('currentUser')){
	function currentUser(){
		return auth('api')->user();
	}
}