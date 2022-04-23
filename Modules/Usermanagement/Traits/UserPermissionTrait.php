<?php 
namespace Modules\Usermanagement\Traits;


trait UserPermissionTrait{
    public function isAdminstrator():bool{
    
    }

    public static function accessUri(){
        return self::allPermissions()->pluck('access_uri')->toArray();
    }

      /**
     * Get all permissions of user.
     *
     * @return mixed
     */
    public static function allPermissions()
    {
        $user =currentUser();
        return $user->roles()->with('permissions')
            ->get()->pluck('permissions')->flatten();
    }
}