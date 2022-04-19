<?php
namespace Modules\Usermanagement\Repository;
use Modules\Usermanagement\Entities\User;
class UserRepository{
	private $user;
	public function __construct(){
		$this->user=new User();
	}


	/**
	 * @return  get user
	 */
	public function getUser(){
		return $this->user->with('roles')->orderBy('created_at','desc')->get();
	}

	/**
	 * @return store user
	 */

	public function storeUser(array $data){
		$user=$this->user->create([
			'username'=>$data[username],
			'name'=>$data['name'],
			'phone_no'=>$data['phone_no'],
			'email'=>$data['email'],
			'password'=>$data['password']
		]);
		$roles=$data['roles'] ?? [];
		if($roles){
			$role->roles()->attach($roles);
		}
		return $user;
	}


}
