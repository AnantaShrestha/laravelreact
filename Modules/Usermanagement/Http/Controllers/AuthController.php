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

   /* public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|confirmed|',
        ]);
        if($validator->fails()){
            return $this->apiResponse->ResponseError($validator->errors()->toJson(),NULL,VALIDATIONERROR);
        }
        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));
        if (! $token = JWTAuth::attempt($request->only('email','password'))) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);  
    }*/

    protected function createNewToken($token){
        $user=auth('api')->user();
        $data=[
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60 * 24,
            'user' =>$user
        ];
        \Session::put('user',$user);
        return $this->apiResponse->responseSuccess($data,'Login successfully',SUCCESS);
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
        auth()->logout();
        \Session::forget('user');
        return $this->apiResponse->responseSuccess(NULL,'Logout Successfully',SUCCESS);
    } 
}
