<?php
namespace Modules\Setting\Repository;
use Modules\Setting\Entities\Log;

class LogRepository{
	private $log;

	public function __construct(){
		$this->log=(new Log);
	}
	/**
	 * @return log list
	 */
	public function getLog($data=null){
		$log=$this->log
			->join('users','logs.user_id','=','users.id')
			->select('logs.id','path','method','ip','user_agent','message','status','logs.created_at','users.username');
		if(!empty($data['search']))
			$log=$log->where('message','LIKE','%'.$data['search'].'%');
		$log=$log->orderBy('created_at','desc');
		if(!empty($data['length']) && !empty($data['page']))
			$log=$log->paginate($data['length'],['*'],'page',$data['page']);
		else
			$log=$log->get();
		return $log;
	}
}