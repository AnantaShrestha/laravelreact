<?php
namespace Modules\Usermanagement\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Usermanagement\Repository\PermissionRepository;
use Modules\Usermanagement\Repository\PermissionRouteRepository;
use Modules\Usermanagement\Http\Requests\PermissionRequest;
use App\Http\Api\ApiResponse;
class PermissionController extends Controller
{
    private $apiResponse,$permissionRepo;
    public function __construct(ApiResponse $apiResponse,PermissionRepository $permissionRepo){
        $this->apiResponse=$apiResponse;
        $this->permissionRepo=$permissionRepo;
    }
    public function index(){
    	try{
            $data=[
                'length'=>$_GET['length'] ?? 2,
                'page' =>$_GET['page'] ?? 1,
                'search'=>$_GET['search'] ?? null
            ];
            $permissions= $this->permissionRepo->getPermission($data);
            return $this->apiResponse->responseSuccess($permissions,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }

    /**
     * @return null
     * store permission 
    */
    public function store(PermissionRequest $request){
         try {
            $permission=$this->permissionRepo->storePermission($request->validated());
            return $this->apiResponse->responseSuccess($permission,'Permission created successfully',SUCCESS);
        } catch (Exception $e) {
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }


    /**
     * @return 
     * permission according to id
     */
    public function edit($id){
        try{
            $permission=$this->permissionRepo->findPermission($id);
            return $this->apiResponse->responseSuccess($permission,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }

    /**
     * @return update permission
     */
    public function update(PermissionRequest $request,$id){
         try {
            $permission=$this->permissionRepo->updatePermission($id,$request->validated());
            return $this->apiResponse->responseSuccess($permission,'Permission updated successfully',SUCCESS);
        } catch (Exception $e) {
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }

    /**
     * 
     * @return permission delete
     */

    public function delete($id){
        try{
            $this->permissionRepo->deletePermission($id);
            return $this->apiResponse->responseSuccess([],'Permission delete successfully',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
     /**
     * @return permission route list
     */
    public function permissionRouteList(){
        try{
            $permissionRouteList=(new PermissionRouteRepository)->routeList();
             return $this->apiResponse->responseSuccess($permissionRouteList,Null,SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseSuccess(null,$e->getMessage(),$e->statusCode());
        }
    }
}
