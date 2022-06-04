import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";

import useForm from '@/hooks/useForm'
import Button from '@/components/admin/Button'
import {ChatUserMessageAction} from '@/services/redux/chat/ChatAction'
import {initiateSocketConnection} from '@/socket/services'
const Message = (props) =>{
	const {messages,receiverUserId}=props
	const dispatch=useDispatch()
	const messageForm = (e) =>{
		if(Object.keys(errors).length  === 0){
			let socket =initiateSocketConnection()
			dispatch(ChatUserMessageAction(values))
			socket.on("private-channel:Modules\\Chatroom\\Events\\PrivateMessageEvent",function(message){
				console.log(message)
			})
		}	
	}
	const {isLoading,isDisable,values,setValues,setValidation,errors,handleChange,handleSubmit,setReset} = useForm(messageForm);
	//use effect
	useEffect(() => {   
		setValidation({
			message:{
				rules:'required'
			}
		})   
		setReset(true)
	 },[]);
	useEffect(()=>{
		setValues({
			...values,
			receiver_id:receiverUserId
		})
	},[receiverUserId])
	return(
		<>
		{
			messages?.user ? (
				<>
					<div className="chat-person">
						<h2>{messages.user.name}</h2>
					</div>
					<div className="chat-person-list">
					</div>
					<div className="chat-person-form">
						<form method='post' onSubmit={handleSubmit}>
							<div className={`chat-person-form-wrapper ${errors?.message && 'invalid'}`}>
								<textarea name="message" className="message-box" placeholder="Send Message..." onChange={handleChange}></textarea>
								<Button isLoading={isLoading} isDisable={isDisable} type="submit" className="btn-success" name='Send' />
							</div>
						</form>
					</div>
				</>
				) : (
					<div className="not-chat-selected">
						<h2>No Person Selected</h2>
					</div>
				)
			}
		</>
	)
}

export default Message