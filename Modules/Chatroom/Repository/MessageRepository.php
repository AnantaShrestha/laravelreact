<?php
namespace Modules\Chatroom\Repository;
use Modules\Chatroom\Entities\Message;
use Modules\Chatroom\Entities\UserMessage;
use Modules\Chatroom\Events\PrivateMessageEvent;
class MessageRepository{
	private $message,$userMessage;

	public function __construct(){
		$this->message=(new Message);
		$this->userMessage=(new UserMessage);
	}

	/**
	 * @return get user conversion according to id
	 */
	public function getMessage($id){
		
	}

	/**
	 * @return post user message
	 */
	public function storeMessage(array $data){
		$senderId=currentUser()->id;
		$message=$this->message->create(['message'=>$data['message']]);
		if($message){
			$userMessage=$this->userMessage->create([
							'sender_id'=>$senderId,
							'receiver_id'=>$data['receiver_id'],
							'message_id'=>$message->id
						]);
			$datas=[];
			$datas['sender_id']=$senderId;
			$datas['receiver_id']=$data['receiver_id'];
			$datas['created_at']=$message->created_at;
			$datas['message']=$message->message;
			$datas['message_id']=$userMessage->message_id;
			event(new PrivateMessageEvent($datas));
		}
		return $datas;
	}

	
}