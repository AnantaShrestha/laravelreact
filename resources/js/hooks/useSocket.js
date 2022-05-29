import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';
const useSocket = () =>{
	const [socket,setSocket] = useState(null)
	useEffect(()=>{
		const newSocket = io(`http://${window.location.hostname}:8005`);
    	setSocket(newSocket);
    	return () => newSocket.close();
	},[setSocket])
	return{
		socket
	}
}

export default useSocket