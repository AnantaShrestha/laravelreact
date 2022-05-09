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
            $data=[
                'length'=>$_GET['length'] ?? null,
                'search'=>$_GET['search'] ?? null,
                'page'=>$_GET['page'] ?? null
            ];
            $user= $this->userRepo->getUser($data);
            return $this->apiResponse->responseSuccess($user,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
    /**
     * @return chat list user
     */
    public function chatListUser(){
         try{
            $data=[
                'length'=>$_GET['length'] ?? null,
                'search'=>$_GET['search'] ?? null,
                'page'=>$_GET['page'] ?? null
            ];
            $user= $this->userRepo->getChatUserList($data);
            return $this->apiResponse->responseSuccess($user,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
    
    /**
     * 
     * @return store user in database
     */
    public function store(UserRequest $request){
        try{
            $user=$this->userRepo->storeUser($request->validated());
            return $this->apiResponse->responseSuccess($user,'User created successfully',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }

    /**
     * 
     * @return user according to id
     */
    public function edit($id){
        try{
            $user=$this->userRepo->findUser($id);
            return $this->apiResponse->responseSuccess($user,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
    /**
     * 
     * @return update database according to id
     */
    public function update(UserRequest $request,$id){
        try {
            $user=$this->userRepo->updateUser($id,$request->validated());
            return $this->apiResponse->responseSuccess($user,'User updated successfully',SUCCESS);
        } catch (Exception $e) {
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
    /**
     * 
     * @return remove user form database
     */
    public function delete($id){
        try{
            $this->userRepo->deleteUser($id);
            return $this->apiResponse->responseSuccess([],'User delete successfully',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }

    /**
     * 
     * @return user permission
     */
    public function userPermission(){
        try{
            $userPermission=$this->userRepo->userPermission();
            return $this->apiResponse->responseSuccess($userPermission,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
}
