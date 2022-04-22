<?php 
namespace Modules\Usermanagement\Traits;


trait UserPermissionTrait{
    protected static $allPermissions = null;
    protected static $allViewPermissions = null;

    public function isAdministrator(): bool
    {
        return $this->isRole('administrator');
    }

    public function isRole(string $role): bool
    {
        return $this->roles->pluck('slug')->contains($role);
    }

      /**
     * Get all permissions of user.
     *
     * @return mixed
     */
    public static function allPermissions()
    {
        if (self::$allPermissions === null) {
            self::$allPermissions = $user->roles()->with('permissions')
                ->get()->pluck('permissions')->flatten();
        }
        return self::$allPermissions;
    }
}