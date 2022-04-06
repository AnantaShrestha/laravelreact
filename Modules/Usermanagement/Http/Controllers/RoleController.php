<?php

namespace Modules\Usermanagement\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Usermanagement\Repository\RoleRepository;
use Modules\Usermanagement\Http\Requests\RoleRequest;
use App\Http\Api\ApiResponse;
class RoleController extends Controller
{
    private $roleRepo;
}
