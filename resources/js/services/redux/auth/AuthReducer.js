import {AuthActionType} from './AuthAction'
const authState= {
	isLoggedIn:false,
	user:{},
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
			return {
				...state,
				isLoggedIn:true,
				user:action.payload.data.user,
			}
		case AuthActionType.LOGIN_FAILED:
			return {
				...state,
				isLoggedIn:false,
				user:{}
			}
		case AuthActionType.LOGOUT_SUCCESS:
			localStorage.removeItem('token')
			delete axios.defaults.headers.common['Authorization']
			return{
				...state,
				isLoggedIn:false,
				user:null
			}

		default:
			return state
	}
}



export default AuthReducer