<?php 
namespace Modules\Usermanagement\Observers;
use Modules\Usermanagement\Entities\Permission;
class PermissionObserver{
    public function creating(Permission $permission){
    	$permission->slug = \Str::slug($permission->name);
    	$permission->created_by=auth()->guard('api')->user()->id;
    }

    public function updating(Permission $permission){
        $permission->slug = \Str::slug($permission->name);
        $permission->updated_by=auth()->guard('api')->user()->id;
    }


}
