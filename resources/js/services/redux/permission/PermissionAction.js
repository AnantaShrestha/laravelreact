import {NotificationActionType} from '../notification/notificationAction'

export const PermissionActionType={
	SET_ROUTELIST:"SET_ROUTELIST",
	SET_PERMISSIONS:"SET_PERMISSIONS",
	SET_PERMISSION:"SET_PERMISSION",
	CREATED_SUCCESS:"CREATED_SUCCESS",
	EDIT_SUCCESS:"UPDATED_SUCCESS",
	UPDATE_SUCCESS:"UPDATED_SUCCESS",
	DELETED_SUCCESS:"DELETED_SUCCESS",
	SET_FAILED:"SET_FAILED"
}
//route list action
export const RouteListAction = () => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.get('/admin/permission/route/list').then(resp=>{
			dispatch({
				type:PermissionActionType.SET_ROUTELIST,
				payload:resp.data
			})
			resolve(resp)

		}).catch(err=>{
			if(err.response){
				dispatch({
					type:PermissionActionType.SET_FAILED,
					payload:err.response.message
				})
			}
			reject(err)
		})
	})
}
//permissions list action
export const PermissionsListAction = () => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.get('/admin/permission/').then(resp=>{
			dispatch({
				type:PermissionActionType.SET_PERMISSIONS,
				payload:resp.data
			})
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:PermissionActionType.SET_PERMISSIONS,
					payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
			}
			reject(err)

		})
	})
}

//create permission
export const CreatePermissionAction = (permissionFormState,navigate) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.post('/admin/permission/store',permissionFormState).then(resp=>{
			dispatch({
				type:PermissionActionType.CREATED_SUCCESS,payload:resp.data})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			navigate('/admin/permission')
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:PermissionActionType.SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
				
			}
			reject(err)
		})
	})
}

//edit permission
export const EditPermissionAction = (permissionsFormState,id,navigate) => (dispatch) =>{
	return new Promise((resolve,reject) =>{
		Api.get('/admin/permission/edit/'+id).then(resp=>{
			dispatch({
				type:PermissionActionType.EDIT_SUCCESS,payload:resp.data
			})
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:PermissionActionType.SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
				
			}
			reject(err)
		})
	})
}

// update permission
export const UpdatePermissionAction = (permissionFormState,id,navigate) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.put('/admin/permission/edit/'+id,permissionFormState).then(resp=>{
			dispatch({
				type:PermissionActionType.UPDATE_SUCCESS,payload:resp.data
			})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			navigate('/admin/permission')
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:PermissionActionType.SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
				
			}
			reject(err)
		})
	})
}
//deleted permission
export const DeletePermissionAction = (id) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.delete('/admin/permission/delete/'+id).then(resp =>{
			dispatch({
				type:PermissionActionType.DELETED_SUCCESS,
				payload:{id:id}
			})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'danger',message:resp.data.message
			}})

		}).catch(err=>{
			if(err.response){
				dispatch({
					type:PermissionActionType.SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
				
			}
			reject(err)
		})
	})
}