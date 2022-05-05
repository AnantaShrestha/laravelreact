import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import useForm from '@/hooks/useForm'
import {shortName} from '@/core/globalFunction'
import { UserListAction } from '@/services/redux/user/UserAction'
//import {FaRegPaperPlane} from 'react-icons/fa';

const ChatRoom = () =>{
	const dispatch=useDispatch()
	const [data,setData]=useState({
		length:10,
		page:1,
		search:''
	})

	const users=useSelector((state) => state.user.users.data)
	useEffect(() => {
		dispatch(UserListAction(data))
	}, [data])
	return(
		<>
			
		<div className="chat-room-wrapper">
			<div className="chat-row-message-wrapper">
				<div className="chat-person">
					<h2>Ananta Shrestha</h2>
				</div>
				<div className="chat-person-list">
				</div>
				<div className="chat-person-form">
					<div className="chat-person-form-wrapper">
						<input name="message" className="message-box" placeholder="Send Message..."  />
					</div>
				</div>
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
								<div className="chat-user-item" key={rowIndex}>
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