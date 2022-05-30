const express =require('express')
const app=express()
const http=require('http')
const server =http.createServer(app)
const io=require('socket.io')(server,{
	cors:{origin: "*"},
})
var Redis=require('ioredis')
var redis = new Redis()
var users=[]
server.listen(8005,()=>{
	console.log('Server is running')
});
// redis.subscribe('private-channel',function(){
// 	console.log('subscribe to private channel')
// })
// redis.on('message',function(channel,message){
// 	console.log(channel)
// 	message=JSON.parse(message)
// 	console.log(message)
// 	if(channel== 'private-channel'){
// 		let data =message.data.data
// 		let receiver_id=data.receiver_id
// 		let event =message.event
// 	}
// 	io.to(`${users[receiver_id]}`).emit(channel + ':' + message.event,data)
// })
io.on('connection',(socket)=>{
	socket.on("userConnected",function(userId){
		users[userId] = socket.id
		io.emit('updateUserStatus',users)
		console.log(`User Connected ${userId}`)
	
	})
	socket.on('disconnect', function() {
        var i = users.indexOf(socket.id);
        users.splice(i, 1,null);
        console.log(users);
        io.emit('updateUserStatus', users);
    });
});