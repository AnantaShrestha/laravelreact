<?php
namespace Modules\Usermanagement\Entities;
use Illuminate\Database\Eloquent\Model;
class Permission extends Model
{
    protected $guarded = [];

    public function setAccessUriAttribute($value)
    {
            $this->attributes['access_uri'] =implode(',',$value ?? []);
    }

    public function getAccessUriAttribute($value)
    {
        return explode(',',$value);
    }


}
