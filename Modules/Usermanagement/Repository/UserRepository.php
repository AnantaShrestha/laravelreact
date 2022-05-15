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
	public function getUser($data){
		$user=$this->user->with('roles')
					->select('id','name','username','email','phone_no','created_at');
		if(isset($data['search']) && !empty($data['search']))
			$user=$user->where('name','LIKE','%'.$data['search'].'%');
		$user=$user->orderBy('created_at','desc');
		if(isset($data['length']) && !empty($data['length']) && !empty($data['page']))
			$user=$user->paginate($data['length'],['*'],'page',$data['page']);
		else
			$user=$user->get();
		return $user;
	}

	/**
	 * @return get list user for chat without role
	 */
	public function getChatUserList($data){
		$user=$this->user->where('id','!=',auth('api')->user()->id)
				->select('id','name','username');
		if(isset($data['search']) && !empty($data['search']))
			$user=$user->where('name','LIKE','%'.$data['search'].'%');
		$user=$user->orderBy('name','asc');
		if(isset($data['length']) && !empty($data['length']) && !empty($data['page']))
			$user=$user->paginate($data['length'],['*'],'page',$data['page']);
		else
			$user=$user->get();
		return $user;
	}

	/**
	 * @return store user
	 */

	public function storeUser(array $data){
		$user=$this->user->create([
			'username'=>$data['username'],
			'name'=>$data['name'],
			'phone_no'=>$data['phone_no'] ?? '',
			'email'=>$data['email'],
			'password'=>$data['password'],
			'activate' => $data['activate'] ?? 1
		]);
		$roles=$data['roles'] ?? [];
		if($roles){
			$user->roles()->attach($roles);
		}
		return $user;
	}

	/**
	 * @return find user according to id
	 */
	public function findUser($id){
		return $this->user->with('roles')->findOrFail($id);
	}

	/**
	 * @return find user according id without role
	 */
	public function findChatUser($id){
		return $this->user->findOrFail($id,['id','name','username']);
	}

	/** 
	 * @return update user according to id
	 */
	public function updateUser($id,array $data)
	{
		$user=$this->findUser($id);
		$user->update([
			'username'=>$data['username'],
			'name'=>$data['name'],
			'phone_no'=>$data['phone_no'] ?? '',
			'email'=>$data['email'],
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



	/**
	 * 
	 * @return permission according to user
	 */
	public function userPermission(){
		return $this->user->allViewPermissions();
	}
}
