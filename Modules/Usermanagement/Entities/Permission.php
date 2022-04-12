<?php
namespace Modules\Usermanagement\Entities;
use Illuminate\Database\Eloquent\Model;
class Permission extends Model
{
    protected $guarded = [];

    // public function users()
    // {

    //     return $this->belongsToMany(User::class,'users_permissions', 'permission_id', 'user_id');
    // }

    // public function roles()
    // {
    //     return $this->belongsToMany(Role::class,'roles_permissions', 'permission_id', 'role_id');
    // }
    
    public function setAccessUriAttribute($value)
    {
            $this->attributes['access_uri'] =implode(',',$value ?? []);
    }

    public function getAccessUriAttribute($value)
    {
        return explode(',',$value);
    }


}
