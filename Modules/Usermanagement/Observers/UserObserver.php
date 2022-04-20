<?php 
namespace Modules\Usermanagement\Observers;
use Modules\Usermanagement\Entities\User;
class UserObserver{
    public function creating(User $user){
    	$user->slug = \Str::slug($user->name);
    	$user->created_by=auth()->guard('api')->user()->id;
    }

    public function updating(user $user){
        $user->slug = \Str::slug($user->name);
        $user->updated_by=auth()->guard('api')->user()->id;
    }


}
