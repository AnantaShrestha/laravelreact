<?php
namespace Modules\Usermanagement\Repository;
use Modules\Usermanagement\Entities\Permission;

class PermissionRepository{
	private $permission;

	public function __construct(){
		$this->permission=(new Permission);
	}
	/**
	* @return 
	* get list of permission
	*/
	public function getPermission($data){
		$permission=$this->permission
						->select('id','name','access_uri','created_at');
		if(!empty($data['search'])){
			$permission=$permission->where('name','LIKE','%'.$data['search'].'%');
		}
		return $permission->orderBy('created_at','desc')
						  ->paginate($data['length'],['*'],'page',$data['page']);
	}
	/**
	 * @return find permission according to id
	 */
	public function findPermission($id){
		return $this->permission->findOrFail($id);
	}

	/**
	 * @return null
	 * store permission in database
	 */
	public function storePermission(array $data){
		return $this->permission->create($data);
	}

	/**
	 * @return null
	 * update permission according to id
	 */
	public function updatePermission($id,array $data){
		$permission=$this->findPermission($id);
		$permission->update($data);
		return $permission;
	}

	/**
	 * @return null
	 * delete permission according to permission
	 */
	public function deletePermission($id){
		$permission=$this->findPermission($id);
		$permission->delete();
		return $permission;
	}

}