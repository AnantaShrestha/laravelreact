import {NotificationActionType} from '../notification/notificationAction'

export const AuthActionType = {
	LOGIN_SUCCESS:"LOGIN_SUCCESS",
	LOGIN_FAILED:"LOGIN_FAILED",
	LOGOUT_SUCCESS:'LOGOUT_SUCCESS',
	LOGOUT_FAILED:'LOGOUT_FAILED',
	SET_USER_PERMISSION:'SET_USER_PERMISSION',
};

//login action
export const LoginAuthAction =(loginState, navigate) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.post('/admin/login',loginState).then(resp=>{
			dispatch({type:AuthActionType.LOGIN_SUCCESS,payload:resp.data})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			navigate('/admin/dashboard')
			dispatch(UserPermissionAction())
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:AuthActionType.LOGIN_FAILED,
					payload:err.response
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})


			}
			reject(err)
		})
	})
};


//logout action
export const LogoutAuthAction = (navigate) => (dispatch)=>{
	return new Promise((resolve,reject)=>{
		Api.get('/admin/logout').then(resp=>{
			dispatch({type:AuthActionType.LOGOUT_SUCCESS,payload:resp.data})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			navigate('/admin/login')
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:AuthActionType.LOGOUT_FAILED,
					payload:err.response
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
			}
			reject(err)
		})
	})
}


//set user permission
export const UserPermissionAction =() =>(dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.get('/admin/user/permission').then(resp=>{
			dispatch({
				type:AuthActionType.SET_USER_PERMISSION,
				payload:resp.data
			})
		}).catch(err=>{
			if(err.response){
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
			}
			reject(err)
		})
	})
}