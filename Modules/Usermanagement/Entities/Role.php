<?php
namespace Modules\Usermanagement\Entities;
use Illuminate\Database\Eloquent\Model;
class Role extends Model
{
    protected $guarded = [];


    public function permissions()
    {
        return $this->belongsToMany(Permission::class,'roles_permissions', 'role_id', 'permission_id');
    }
}
