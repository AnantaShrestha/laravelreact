export const AuthActionType = {
	LOGIN_SUCCESS:"LOGIN_SUCCESS",
	LOGIN_FAILED:"LOGIN_FAILED",
	LOGOUT_SUCCESS:'LOGOUT_SUCCESS',
	LOGOUT_FAILED:'LOGOUT_FAILED',
};

//login action
export const LoginAuthAction =(loginState, navigate) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.post('/admin/login',loginState).then(resp=>{
			dispatch({type:AuthActionType.LOGIN_SUCCESS,payload:resp.data})
			navigate('/admin/dashboard')
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:AuthActionType.LOGIN_FAILED,
					payload:err.response
				})
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
			navigate('/admin/login')
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:AuthActionType.LOGOUT_FAILED,
					payload:err.response
				})
			}
			reject(err)
		})
	})
}
