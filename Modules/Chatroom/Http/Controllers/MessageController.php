<?php

namespace Modules\Chatroom\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use \Modules\Chatroom\Repository\MessageRepository;
class MessageController extends Controller
{
    private $messageRepo;


    public function __construct(MessageRepository $messageRepo){
        $this->messageRepo=$messageRepo;
    }

    /**
     * @return get user conversion according to id
     */

    public function getConversation($id){
        
    }
}
