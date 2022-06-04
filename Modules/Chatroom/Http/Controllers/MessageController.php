<?php

namespace Modules\Chatroom\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use \Modules\Chatroom\Repository\MessageRepository;
use Modules\Usermanagement\Repository\UserRepository;
use Modules\Chatroom\Http\Requests\MessageRequest;
use App\Http\Api\ApiResponse;
class MessageController extends Controller
{
    private $messageRepo,$userRepo,$apiResponse;


    public function __construct(MessageRepository $messageRepo,
                                    ApiResponse $apiResponse,
                                    UserRepository $userRepo){
        $this->messageRepo=$messageRepo;
        $this->apiResponse=$apiResponse;
        $this->userRepo=$userRepo;
    }

    /**
     * @return get user conversion according to id
     */

    public function getConversation($id){
        try{
            $data=[
                'user'=>$this->userRepo->findChatUser($id)
            ];
            return $this->apiResponse->responseSuccess($data,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }

    public function sendMessage(MessageRequest $request){
        try {
            $message=$this->messageRepo->storeMessage($request->validated());
            return $this->apiResponse->responseSuccess($message,'Message send successfully',SUCCESS);
        } catch (Exception $e) {
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
     /**
     * @return online user
     */

    public function getonlineUser(){
        try{
            $onlineUser=$this->messageRepo->getOnlineUser();
            return $this->apiResponse->responseSuccess($onlineUser,'Success',SUCCESS);
        }catch(Exception $e){
            return $this->apiResponse->responseError(null,$e->getMessage(),$e->statusCode());
        }
    }
}
