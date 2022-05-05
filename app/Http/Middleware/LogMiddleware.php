<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Modules\Setting\Entities\Log;
use App\Http\Api\ApiResponse;

class LogMiddleware
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
        try{
            $response=$next($request);
            if($response->exception){
                $message=$response->exception->getMessage().', '.$response->exception->getFile().', '.$response->exception->getLine();
                $this->createLog($request,$message,0);
            }
            if($request->method() != 'GET'){
                $responseData=json_decode($response->getContent(),true);
                $this->createLog($request,$responseData['message'],1);
            }
            return $response;
        }catch(Exception $e){
            return (new ApiResponse)->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }


    protected function createLog($request,$message,$status){
        $data=[
            'user_id'=>auth('api')->user()->id ,
            'path'=>$request->path(),
            'ip'=>$request->getClientIp(),
            'method'=>$request->method(),
            'user_agent'=>$request->header('User-Agent'),
            'status'=>$status,
            'message'=>$message     
        ];
        return Log::create($data);
    }
}
