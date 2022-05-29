import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import {shortName} from '@/core/globalFunction'
import { ChatListUserAction } from '@/services/redux/user/UserAction'
import {UserMessageAction} from '@/services/redux/message/MessageAction'
import {currentUser} from '@/core/globalFunction'
import Message from './message'
const ChatRoom = () =>{
	const dispatch=useDispatch()
	const users=useSelector((state) => state.user.chatUsers.data)
	const messages=useSelector((state) => state.message.messages)
	const [data,setData]=useState({
		length:10,
		page:1,
		search:''
	})
	const [receiverUserId,setReceiverUserId]=useState();
	const [activeUsers,setActiveUsers]=useState([])

	useEffect(() => {
		dispatch(ChatListUserAction(data))
	}, [data])

	const selectUser = (userId) =>{
		dispatch(UserMessageAction(userId))
		setReceiverUserId(userId)
	}
	return(
		<>	
		<div className="chat-room-wrapper">
			<div className="chat-row-message-wrapper">
				<Message
					messages={messages}
					receiverUserId={receiverUserId}
				/>
				
			</div>
			<div className="chat-row-list-wrapper">
				<div className="chat-list-items">
					<div className="chat-heading">
						<h2>Users</h2>
					</div>
					<div className="chat-user-list">
						{
							users && Object.entries(users)?.map(([rowIndex, user], i)=>{
								return(
									<div className="chat-user-item" key={rowIndex} onClick={()=>selectUser(user.id)}>
										<div className="chat-user-image">
											<span>{shortName(user.name)}</span>
											<div className={`chat-online-status  ${(activeUsers[user.id]!=undefined || activeUsers[user.id]!=null ) && 'green'}`}></div>
										</div>
										<div className="chat-user-name">
											<span>{user.name}</span>
										</div>
									</div>
								)
							})
							
						}
					</div>
				</div>
			</div>
		</div>
		</>
	)

}

export default ChatRoom