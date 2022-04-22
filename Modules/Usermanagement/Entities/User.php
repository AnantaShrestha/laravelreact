<?php
namespace Modules\Usermanagement\Entities;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Modules\Usermanagement\Traits\UserPermissionTrait;
class User extends Authenticatable implements JwtSubject 
{
    use UserPermissionTrait;
    protected $fillable = [
        'name',
        'email',
        'username',
        'phone_no',
        'password',
        'activate',
        'image',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class,'users_roles', 'role_id', 'user_id');
    }

    public function setPasswordAttribute($value){
        $this->attributes['password'] =bcrypt($value);
    }


    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

}
