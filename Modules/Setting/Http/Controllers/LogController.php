<?php

namespace Modules\Setting\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\Setting\Repository\LogRepository;
use App\Http\Api\ApiResponse;
class LogController extends Controller
{
    private $logRepo,$apiResponse;
    public function __construct(ApiResponse $apiResponse,LogRepository $logRepo)
    {
        $this->logRepo=$logRepo;
        $this->apiResponse=$apiResponse;
    }
    /**
     * @return log
     */
    public function index(){
        try{
            $data=[
                'length'=>$_GET['length'] ?? null,
                'search'=>$_GET['search'] ?? null,
                'page'=>$_GET['page'] ?? null
            ];
            $logs= $this->logRepo->getLog($data);
            return $this->apiResponse->responseSuccess($logs,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
}
