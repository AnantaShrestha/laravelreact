import { io } from 'socket.io-client';
let socket;

export const initiateSocketConnection = () => {
	socket = io(`http://${window.location.hostname}:8005`);
	console.log(`Connecting socket...`);
}

export const disconnectSocketConnection = () =>{
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
}