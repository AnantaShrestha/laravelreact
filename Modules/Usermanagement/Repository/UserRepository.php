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
			'password'=>$data['password'],
			'activate' => $data['activate'] ?? 1
		]);
		$roles=$data['roles'] ?? [];
		if($roles){
			$role->roles()->attach($roles);
		}
		return $user;
	}

	/**
	 * @return find user according to id
	 */
	public function findUser($id){
		return $this->user->with('roles')->findOrFail();
	}


	/** 
	 * @return update user according to id
	 */
	public function updateUser($id,array $data)
	{
		$user=$this->findUser($id);
		$user->update([
			'username'=>$data[username],
			'name'=>$data['name'],
			'phone_no'=>$data['phone_no'],
			'email'=>$data['email'],
			'password'=>$data['password'],
			'activate' => $data['activate'] ?? 1
		]);
		$roles=$data['roles'] ?? [];
		if($roles){
			$user->roles()->detach();
			$user->roles()->attach($roles);
		}
		return $user;
	}


	/**
	 * @return delete user according to id
	 */
	public function deleteUser($id){
		$user=$this->findUser($id);
		$user->roles()->detach();
		return $user->delete();
	}
}
