const express =require('express')
const app=express()
const http=require('http')
const server =http.createServer(app)

const io=require('socket.io')(server,{
	cors:{origin: "*"}
})

server.listen(8005,()=>{
	console.log('Server is running')
});

io.on('connection',(socket)=>{
	socket.on('send_message',(data)=>{
		console.log(data)
	})
});