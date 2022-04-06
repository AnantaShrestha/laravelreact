<?php
namespace Modules\Usermanagement\Repository;
use Modules\Usermanagement\Entities\Role;

class RoleRepository{
	private $role;

	public function __construct(Role $role){
		$this->role=$role;
	}


	public function getRole($data){
		$role=$this->role
			->select('id','name','created_at');
		if(!empty($data['search'])){
			$role=$role->where('name','LIKE','%'.$data['search'].'%');
		}
		return $role->orderBy('created_at','desc')
					->paginate($data['length'],['*'],'page',$data['page']);
	}
}