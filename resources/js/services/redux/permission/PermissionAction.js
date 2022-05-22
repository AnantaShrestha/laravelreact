import {NotificationActionType,PermissionActionType} from '../../types'
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
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
			}
			reject(err)
		})
	})
}
//permissions list action
export const PermissionsListAction = (data) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		let get=data ? '?page='+data.page+'&&length='+data.length+'&&search='+data.search : ''
		Api.get('/admin/permission'+get).then(resp=>{
			dispatch({
				type:PermissionActionType.SET_PERMISSIONS,
				payload:resp.data
			})
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

//create permission
export const CreatePermissionAction = (permissionFormState,navigate) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.post('/admin/permission/store',permissionFormState).then(resp=>{
			dispatch({
				type:PermissionActionType.PERMISSION_CREATED_SUCCESS,payload:resp.data})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			navigate('/admin/permission')
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

//edit permission
export const EditPermissionAction = (id) => (dispatch) =>{
	return new Promise((resolve,reject) =>{
		Api.get('/admin/permission/edit/'+id).then(resp=>{
			dispatch({
				type:PermissionActionType.PERMISSION_EDIT_SUCCESS,payload:resp.data
			})
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

// update permission
export const UpdatePermissionAction = (permissionFormState,id,navigate) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.put('/admin/permission/edit/'+id,permissionFormState).then(resp=>{
			dispatch({
				type:PermissionActionType.PERMISSION_UPDATE_SUCCESS,payload:resp.data
			})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			navigate('/admin/permission')
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
//deleted permission
export const DeletePermissionAction = (id) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.delete('/admin/permission/delete/'+id).then(resp =>{
			dispatch({
				type:PermissionActionType.PERMISSION_DELETED_SUCCESS,
				payload:{id:id}
			})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'danger',message:resp.data.message
			}})

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