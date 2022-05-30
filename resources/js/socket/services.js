import { io } from 'socket.io-client';
import {getCurrenctUser} from '@/core/globalFunction'
let socket;

export const initiateSocketConnection = () => {
	socket = io(`http://${window.location.hostname}:8005`);
	console.log(`Connecting socket...`);
	return socket
}
export const connectedToSocket = (userId) =>{
	socket=initiateSocketConnection()
	socket.on('connect',function(){
		socket.emit('userConnected',userId)
	})
	return socket
}

export const disconnectSocketConnection = () =>{
    console.log('Disconnecting socket...');
    if(socket) return socket.disconnect();
}