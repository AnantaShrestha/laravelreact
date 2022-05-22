const useSocket = () =>{
	let ipAddress='127.0.0.1'
	let socketPort='8005'
	let networkAddress =ipAddress+':'+socketPort
	return{
		networkAddress
	}
}
export default useSocket