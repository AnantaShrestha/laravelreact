const express =require('express')
const app=express()
const http=require('http')
const server =http.createServer(app)
let users=[]
const io=require('socket.io')(server,{
	cors:{origin: "*"}
})

server.listen(8005,()=>{
	console.log('Server is running')
});

io.on('connection',(socket)=>{
	console.log('connecting...')
	socket.on('connected',function(userId){
		users[userId]=socket.id
		console.log(users)
		io.emit('updateUserStatus',users)
		console.log('User Connected ' + userId)
	});

	socket.on('disconnect',function(){
		let i =users.indexOf(socket.id)
		users.splice(i,1,0)
		io.emit('updateUserStatus',users)
		console.log(users)
	})
});