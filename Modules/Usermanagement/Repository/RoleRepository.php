<?php
namespace Modules\Usermanagement\Repository;
use Modules\Usermanagement\Entities\Role;

class RoleRepository{
	private $role;

	public function __construct(){
		$this->role=new Role();
	}


	public function getRole(){
		$role=$this->role
				->with('permissions')
				->select('id','name','created_at');
		return $role->orderBy('created_at','desc')->get();
	}

	/**
	 * @return null
	 * store role in database
	 */
	public function storeRole(array $data){
		$role=$this->role->create([
			'name'=>$data['name']
		]);
		$permissions=$data['permissions'] ?? [];
		if($permissions){
			$role->permissions()->attach($permissions);
		}
		return $role;
	}
	/**
	 * 
	 * @return role according to id
	 */
	public function findRole($id){
		return $this->role->with('permissions')->findOrFail($id);
	}


	/**
	 * @return null
	 * update role according to id
	 */
	public function updateRole($id,array $data){
		$role=$this->findRole($id);
		$role->update($data);
		$permissions=$data['permissions'] ?? [];
		$role->permissions()->detach();
		$role->permissions()->attach($permissions);
		return $role;
	}

	/**
	 * @return null
	 * delete role according to id
	 */
	public function deleteRole($id){
		$role=$this->findRole($id);
		$role->permissions()->detach();
		return $role->delete();
	}
}