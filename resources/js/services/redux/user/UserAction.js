import { NotificationActionType } from '../notification/notificationAction'
export const UserActionType = {
	SET_USERS: "SET_USERS",
	SET_USER: "SET_USER",
	USER_SET_FAILED: "USER_SET_FAILED",
	USER_CREATED_SUCCESS: "USER_CREATED_SUCCESS",
	USER_EDIT_SUCCESS: "USER_EDIT_SUCCESS",
	USER_UPDATED_SUCCESS: "USER_UPDATED_SUCCESS",
	USER_DELETED_SUCCESS: "USER_DELETED_SUCCESS",
}

//get user
export const UserListAction = () => (dispatch) => {
	return new Promise((resolve, reject) => {
		Api.get('/admin/user').then(resp => {
			dispatch({ type: UserActionType.SET_USERS, payload: resp.data })
			resolve(resp)
		}).catch(err => {
			if (err.resp) {
				dispatch({
					type: UserActionType.USER_SET_FAILED, payload: err.response.data
				})
				dispatch({
					type: NotificationActionType.MESSAGE_OBJ, payload: {
						type: 'danger', message: err.response.data.message
					}
				})
			}
			reject(err)
		})
	})
}
//create role action
export const CreateUserAction = (userFormState, navigate) => (dispatch) => {
	return new Promise((resolve, reject) => {
		Api.post('/admin/user/store', userFormState).then(resp => {
			dispatch({ type: UserActionType.USER_CREATED_SUCCESS, payload: resp.data })
			dispatch({
				type: NotificationActionType.MESSAGE_OBJ, payload: {
					type: 'success', message: resp.data.message
				}
			})
			navigate('/admin/user')
			resolve(resp)
		}).catch(err => {
			if (err.response) {
				dispatch({
					type: UserActionType.USER_SET_FAILED, payload: err.response.data
				})
				dispatch({
					type: NotificationActionType.MESSAGE_OBJ, payload: {
						type: 'danger', message: err.response.data.message
					}
				})

			}
			reject(err)
		})
	})
}

// edit role action
export const EditUserAction = (id) => (dispatch) => {
	return new Promise((resolve, reject) => {
		Api.get('/admin/user/edit/' + id).then(resp => {
			dispatch({
				type:UserActionType.USER_EDIT_SUCCESS,payload:resp.data
			})
			resolve(resp)
		}).catch(err => {
			if (err.response) {
				dispatch({
					type: UserActionType.USER_SET_FAILED, payload: err.response.data
				})
				dispatch({
					type: NotificationActionType.MESSAGE_OBJ, payload: {
						type: 'danger', message: err.response.data.message
					}
				})
			}
			reject(err)
		})
	})
}

//update user action

export const UpdateUserAction = (userFormState,id,navigate) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.put('/admin/user/edit/'+id,userFormState).then(resp=>{
			dispatch({type:UserActionType.USER_UPDATED_SUCCESS,payload:resp.data})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			
			navigate('/admin/user')
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:UserActionType.USER_SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})	
			}
			reject(err)
		})
	})
}


//delete user action
export const DeleteUserAction = (id) =>(dispatch)=>{
	return new Promise((resolve,reject)=>{
		Api.delete('/admin/user/delete/'+id).then(resp=>{
			dispatch({
				type:UserActionType.USER_DELETED_SUCCESS,
				payload:{id:id}
			})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'danger',message:resp.data.message
			}})
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:UserActionType.USER_SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
				
			}
			reject(err)
		})
	})
}