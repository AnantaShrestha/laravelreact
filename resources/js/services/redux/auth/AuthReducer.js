import {AuthActionType} from '../../types'
import useSocket from '@/core/socket'
const {networkAddress} =useSocket()
const authState= {
	isLoggedIn:false,
	user:{},
	userPermission:[],
	activeUser:[]
}

const getAuthState = () =>{
	const getToken =localStorage.getItem('token')
	if(getToken){
		const authObj =JSON.parse(getToken)
		const now = new Date()
		if(now.getTime() > authObj.expiry){
			localStorage.removeItem('token')
			delete axios.defaults.headers.common['Authorization']
			return authState
		}
		return {
			isLoggedIn:true,
			user:authObj.user
		}
	}
	else{
		return authState
	}
		
}
const newAuth=getAuthState()
const AuthReducer = (state=newAuth,action)=>{
	switch(action.type){
		case AuthActionType.LOGIN_SUCCESS:
			const now =new Date()
			const setToken ={
				token:action.payload.data.access_token,
				expiry:now.getTime() + action.payload.data.expires_in,
				user:action.payload.data.user
			}
			localStorage.setItem('token',JSON.stringify(setToken))
			axios.defaults.headers.common[
				"Authorization"
			]  =`Bearer ${action.payload.data.access_token}`;
			const socket=io(networkAddress)
			socket.on('connect',function(){
				socket.emit('connected',action.payload.data.user.id)
			})
			socket.on('updateUserStatus',(data)=>{
				activeUser:data
			})
			return {
				...state,
				isLoggedIn:true,
				user:action.payload.data.user,
			}
			break;
		case AuthActionType.LOGIN_FAILED:
			return {
				...state,
				isLoggedIn:false,
				user:{}
			}
			break;
		case AuthActionType.LOGOUT_SUCCESS:
			localStorage.removeItem('token')
			delete axios.defaults.headers.common['Authorization']
			return{
				...state,
				isLoggedIn:false,
				user:null
			}
			break;
		case AuthActionType.SET_USER_PERMISSION:
			return{
				...state,
				userPermission:action.payload.data
			}
			break;

		default:
			return state
			break;
	}
}



export default AuthReducer