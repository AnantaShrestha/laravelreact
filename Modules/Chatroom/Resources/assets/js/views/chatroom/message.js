import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import useForm from '@/hooks/useForm'
import Button from '@/components/admin/Button'
import io from 'socket.io-client'
const Message = (props) =>{
	const {messages,userId}=props
	const socket = io.connect("127.0.0.1:8005")

	const messageForm = () =>{
		socket.emit('send_message',{message:"Hello"})
		if(Object.keys(errors).length  === 0){
			socket.emit('send_message',{message:"Hello"})
		}
	}
	const {isLoading,isDisable,values,setValues,setValidation,errors,handleChange,handleSubmit} = useForm(messageForm);
	//use effect
	useEffect(() => {   
		setValidation({
			message:{
				rules:'required'
			}
		})     
	 },[]);
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