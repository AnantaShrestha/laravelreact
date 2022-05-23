import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import {shortName} from '@/core/globalFunction'
import { ChatListUserAction } from '@/services/redux/user/UserAction'
import {UserMessageAction} from '@/services/redux/message/MessageAction'
//import {FaRegPaperPlane} from 'react-icons/fa';
import {currentUser} from '@/core/globalFunction'
import Message from './message'
import useSocket from '@/core/socket'
const ChatRoom = () =>{
	const dispatch=useDispatch()
	const {networkAddress} =useSocket()
	const users=useSelector((state) => state.user.chatUsers.data)
	const messages=useSelector((state) => state.message.messages)
	const [data,setData]=useState({
		length:10,
		page:1,
		search:''
	})
	const [userId,setUserId]=useState();
	const [activeUsers,setActiveUsers]=useState([]);
	useEffect(() => {
		dispatch(ChatListUserAction(data))
	}, [data])
	useEffect(()=>{
		const socket=io(networkAddress)
		socket.on('updateUserStatus',(data)=>{
			setActiveUsers(data)
		})
	},[])
	const selectUser = (userId) =>{
		dispatch(UserMessageAction(userId))
		setUserId(userId)
	}
	console.log(activeUsers)
	return(
		<>	
		<div className="chat-room-wrapper">
			<div className="chat-row-message-wrapper">
				<Message
					messages={messages}
					userId={userId}
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
								console.log(i)
								return(
									<div className="chat-user-item" key={rowIndex} onClick={()=>selectUser(user.id)}>
										<div className="chat-user-image">
											<span>{shortName(user.name)}</span>
											<div className="chat-online-status"></div>
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