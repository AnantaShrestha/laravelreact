<?php
namespace Modules\Usermanagement\Repository;
use Modules\Usermanagement\Entities\Role;

class RoleRepository{
	private $role;

	public function __construct()){
		$this->role=new Role();
	}


	public function getRole($data){
		// $role=$this->role
		// 	->select('id','name','created_at');
		// if(!empty($data['search'])){
		// 	$role=$role->where('name','LIKE','%'.$data['search'].'%');
		// }
		// return $role->orderBy('created_at','desc')
		// 			->paginate($data['length'],['*'],'page',$data['page']);
		$role=$this->role
				->select('id','name','created_at');
		return $role->orderBy('created_at','desc')->get();
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
	 * store role in database
	 */
	public function storeRole(array $data){
		return $this->role->create($data);
	}

	/**
	 * @return null
	 * update role according to id
	 */
	public function updateRole($id,array $data){
		$role=$this->findRole($id);
		$role->update($data);
		return $role;
	}

	/**
	 * @return null
	 * delete role according to id
	 */
	public function deleteRole($id){
		$role=$this->findRole($id);
		$role->delete();
		return $role;
	}
}