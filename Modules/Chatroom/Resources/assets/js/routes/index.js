import ChatRoom from '../views/chatroom'
export default[
	{
		path:'/admin/chat',
		exact:true,
		auth:true,
		component:<ChatRoom/>
	}
];