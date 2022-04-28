<?php 
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use App\Http\Api\ApiResponse;
class CheckAuthenticationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $currentRoute = $request->getRequestUri();
        $strPosApi=strpos($currentRoute,'api');
        if($strPosApi){
            try {
                $user =currentUser();
                $url=$request->url();
                if(in_array($url,$user->allViewPermissions()) ||  $this->shouldPassThrough($request)){
                    return $next($request);
                }
                if($user->checkUrlAllowAccess($url)){
                    return $next($request);
                }else{
                    return (new ApiResponse)->responseError(null,'Permission Deny',UNAUTHORIZED);
                }
                return $next($request);
                
            } catch (Exception $e) {
                if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                    return (new ApiResponse)->responseError(NULL,'Token Invalid',UNAUTHORIZED);
                }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                    return (new ApiResponse)->responseError(NULL,'Token Expired',UNAUTHORIZED);
    
                }else{
                    return (new ApiResponse)->responseError(NULL,'Authorize token not found',UNAUTHORIZED);
                }
            }
        }
        //return $next($request);
    }

      /**
     * Determine if the request has a URI that should pass through verification.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return bool
     */
    protected function shouldPassThrough($request)
    {
        $routePath = $request->path();
        $exceptsPath = [
            BACKEND_API_PREFIX.'/login',
            BACKEND_API_PREFIX.'/logout',
            BACKEND_API_PREFIX.'/user/permission'
        ];
    
        return in_array($routePath, $exceptsPath);
    }

}
