<?php

namespace Modules\Usermanagement\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Usermanagement\Entities\User;
use App\Http\Api\ApiResponse;
use JWTAuth;
use Validator;
class AuthController extends Controller
{
    private $apiResponse;

    public function __construct(ApiResponse $apiResponse){
        $this->apiResponse = $apiResponse;
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->apiResponse->responseError($validator->errors(),'Invalid Data',VALIDATIONERROR);
        }
        if (! $token = JWTAuth::attempt($validator->validated())) {
            return $this->apiResponse->responseError(NULL,'Unauthorized', UNAUTHORIZED);
        }
        return $this->createNewToken($token);
    }

    protected function createNewToken($token){
        $user=auth('api')->user();
        $data=[
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60 * 24,
            'user' =>$user
        ];
        $this->onlineUser($user->id);
        return $this->apiResponse->responseSuccess($data,'Login successfully',SUCCESS);
    }

    protected function onlineUser($userId){
        $onlineUser=\Cache::get('onlineUser');
        if(!in_array($userId,$onlineUser)){
            $onlineUser[] = $userId;
        }
        $cacheOnlineUSer = \Cache::put('onlineUser',$onlineUser);
        return $cacheOnlineUSer;
    }

    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Logout user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $user=auth('api')->user();
        \Cache::forget('user-permissions'.$user->id);
        $this->removeOnlineUser($user->id);
        auth()->logout();
        return $this->apiResponse->responseSuccess(NULL,'Logout Successfully',SUCCESS);
    } 

    protected function removeOnlineUser($userId){
        $onlineUser=\Cache::get('onlineUser');
        if (($key = array_search($userId, $onlineUser)) !== false) {
            unset($onlineUser[$key]);
        }
        return \Cache::put('onlineUser',$onlineUser);
    }
}
