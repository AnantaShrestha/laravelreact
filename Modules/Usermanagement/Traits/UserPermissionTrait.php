<?php 
namespace Modules\Usermanagement\Traits;


trait UserPermissionTrait{
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
    /**
     * Get all view permissions of user.
     *
     * @return mixed
     */
    public function allViewPermissions()
    {
        $arrView = [];
        $allPermissionTmp =$this->allPermissions();
        $allPermissionTmp = $allPermissionTmp->pluck('access_uri')->toArray();
        foreach($allPermissionTmp as $actionList){
            foreach ($actionList as  $action) {
                $arrScheme = ['https://', 'http://'];
                $arrView[] =str_replace($arrScheme, '', url($action));
            }
        }
        return $arrView;
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