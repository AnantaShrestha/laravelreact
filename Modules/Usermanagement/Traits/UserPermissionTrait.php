<?php 
namespace Modules\Usermanagement\Traits;


trait UserPermissionTrait{
    protected static $allPermissions = null;
    protected static $allViewPermissions = null;
      /**
     * Get all permissions of user.
     *
     * @return mixed
     */
    public static function allPermissions()
    {
        if(self::$allPermissions == null){
            $user =currentUser();
            self::$allPermissions=\Cache::rememberForever('user-permissions'.$user->id,function() use ($user) {
                $roles=$user->roles()->get();
                $rolesId=[];
                foreach($roles as $role){
                    $rolesId[]=$role->id;
                }
                return \DB::table('roles_permissions')
                        ->join('roles', 'roles_permissions.role_id', '=', 'roles.id')
                        ->whereIn('roles.id',$rolesId)
                        ->join('permissions','roles_permissions.permission_id','=','permissions.id')
                        ->select('permissions.*')
                        ->get();
            });
        }
        return self::$allPermissions;
    }
    /**
     * Get all view permissions of user.
     *
     * @return mixed
     */
    public function allViewPermissions()
    {
        if(self::$allPermissions===null){
            $arrView = [];
            $allPermissionTmp =$this->allPermissions();
            $allPermissionTmp = $allPermissionTmp->pluck('access_uri')->toArray();
            if($allPermissionTmp){
                foreach($allPermissionTmp as $actionList){
                    foreach(explode(',',$actionList) as $action){
                        $arrScheme = ['https://', 'http://'];
                        $arrView[] =str_replace($arrScheme, '', url($action));
                    }
                }
            }
            self::$allViewPermissions=$arrView;
        }
        return self::$allViewPermissions;
    }


    public function checkUrlAllowAccess($url){
 
        $listUrlAllowAccess = $this->allViewPermissions();
        $arrScheme = ['https://', 'http://'];
        $pathCheck = strtolower(str_replace($arrScheme, '', $url));
        if ($listUrlAllowAccess) {
            foreach ($listUrlAllowAccess as  $pathAllow) {
                if ($pathCheck === $pathAllow
                    || $pathCheck  === $pathAllow.'/'
                    || (\Str::endsWith($pathAllow, '*') && ($pathCheck === str_replace('/*', '', $pathAllow) || strpos($pathCheck, str_replace('*', '', $pathAllow)) === 0))
                    || (\Str::endsWith($pathAllow, '{id}') && ($pathCheck === str_replace('/{id}', '', $pathAllow) || strpos($pathCheck, str_replace('{id}', '', $pathAllow)) === 0))
                    ) {
                    return true;
                }
            }
        }
        return false;
    }
}