<?php
namespace \Modules\Chatroom\Repository;

use \Modules\Entities\Message;
class MessageRepository{
	private $message;

	public function __construct(){
		$this->message=(new Message);
	}

	/**
	 * @return post user message
	 */
	public function storeMessage(array $data){

	}

	/**
	 * @return get user conversion according to id
	 */
	public function getMessage($id){

	}
}