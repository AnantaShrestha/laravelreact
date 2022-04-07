import React,{useEffect} from 'react'
import {useSelector} from "react-redux";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FlashMessage = (props) =>{
	const messageObj=useSelector((state) =>state.notification.message_obj)
	console.log(messageObj.type)
	useEffect(()=>{
		if(messageObj.type === 'danger')
		toast.error(messageObj.message)
		if(messageObj.type === 'success')
			toast.success(messageObj.message)
	},[messageObj.message])
	 return (
		<>
			<ToastContainer />	
		</>
	);
}

export default FlashMessage;