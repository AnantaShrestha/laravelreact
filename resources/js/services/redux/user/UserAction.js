import {NotificationActionType,UserActionType} from '../../types'
//get user
export const UserListAction = (data) => (dispatch) => {
	return new Promise((resolve, reject) => { 
		let get=data ? '?page='+data.page+'&&length='+data.length+'&&search='+data.search: ''
		Api.get('/admin/user'+get).then(resp => {
			dispatch({ type: UserActionType.USER_PAGINATION, payload: resp.data })
			resolve(resp)
		}).catch(err => {
			if (err.resp) {
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
			resolve(resp)
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

