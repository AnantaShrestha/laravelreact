<?php

namespace Modules\Usermanagement\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Usermanagement\Repository\RoleRepository;
use Modules\Usermanagement\Http\Requests\RoleRequest;
use App\Http\Api\ApiResponse;
class RoleController extends Controller
{
    private $apiResponse,$roleRepo;
    public function __construct(ApiResponse $apiResponse,RoleRepository $roleRepo){
        $this->apiResponse=$apiResponse;
        $this->roleRepo=$roleRepo;
    }

    /**
     * get role
     */
    public function index(){
        try{
            $role= $this->roleRepo->getRole();
            return $this->apiResponse->responseSuccess($role,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
    /**
     * store role in database
     */
    public function store(RoleRequest $request){
        try {
            $role=$this->roleRepo->storeRole($request->validated());
            return $this->apiResponse->responseSuccess($role,'Role created successfully',SUCCESS);
        } catch (Exception $e) {
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }

    /**
     * return get role according to id
     */
    public function edit($id){
        try{
            $role=$this->roleRepo->findRole($id);
            return $this->apiResponse->responseSuccess($role,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }

    /**
     * @return update role according to id
     */
    public function update(RoleRequest $request,$id){
        try {
            $role=$this->roleRepo->updateRole($id,$request->validated());
            return $this->apiResponse->responseSuccess($role,'Role updated successfully',SUCCESS);
        } catch (Exception $e) {
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }

    /** 
     * @return delete role form database
     */
    public function delete($id){
         try{
            $this->roleRepo->deleteRole($id);
            return $this->apiResponse->responseSuccess([],'Role delete successfully',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
}
