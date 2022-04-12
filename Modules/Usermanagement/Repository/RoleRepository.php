<?php
namespace Modules\Usermanagement\Repository;
use Modules\Usermanagement\Entities\Role;

class RoleRepository{
	private $role;

	public function __construct()){
		$this->role=new Role();
	}


	public function getRole($data){
		$role=$this->role
				->select('id','name','created_at');
		return $role->orderBy('created_at','desc')->get();
	}

	/**
	 * @return null
	 * store role in database
	 */
	public function storeRole(array $data){
		$role=$this->role->create($data);
		$permissions=$data->permissions ?? [];
		$users=$data->users ?? [];
		if($permissions){
			$role->attach($permissions);
		}
		if($user){
			$role->attach($user);
		}
		return $role;
	}
	/**
	 * 
	 * @return role according to id
	 */
	public function findRole($id){
		return $this->role->findOrFail($id);
	}


	/**
	 * @return null
	 * update role according to id
	 */
	public function updateRole($id,array $data){
		$role=$this->findRole($id);
		$role->update($data);
		$permissions=$data->permissions ?? [];
		$users=$data->users ?? [];
			$role->permissions()->detach();
			$role->permissions()->attach($permissions);
			$role->users()->detach();
			$role->users()->attach($users);
		return $role;
	}

	/**
	 * @return null
	 * delete role according to id
	 */
	public function deleteRole($id){
		$role=$this->findRole($id);
		$role->permissions->detach();
		$role->users->detach();
		return $role->delete();
	}
}