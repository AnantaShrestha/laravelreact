<?php

namespace Modules\Usermanagement\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Usermanagement\Repository\UserRepository;
use Modules\Usermanagement\Http\Requests\UserRequest;
use App\Http\Api\ApiResponse;
class UserController extends Controller
{
    private $apiResponse,$userRepo;

    public function __construct(ApiResponse $apiResponse,UserRepository $userRepo){
        $this->apiResponse=$apiResponse;
        $this->userRepo=$userRepo;
    }

    public function index(){
        try{
            $user= $this->userRepo->getUser();
            return $this->apiResponse->responseSuccess($user,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
    

    public function store(UserRequest $request){
        try{
            $user=$this->userRepo->storeUser($request->validated());
            return $this->apiResponse->responseSuccess($user,'User created successfully',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
}
