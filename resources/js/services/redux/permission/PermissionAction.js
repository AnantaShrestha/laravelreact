import {NotificationActionType} from '../notification/notificationAction'

export const PermissionActionType={
	SET_ROUTELIST:"SET_ROUTELIST",
	SET_ROUTELIST_FAILED:"SET_ROUTELIST_FAILED",
	SET_PERMISSIONS:"SET_PERMISSIONS",
	SET_PERMISSION_FAILED:"SET_PERMISSION_FAILED",
	SET_PERMISSION:"SET_PERMISSION",
	CREATED_SUCCESS:"CREATED_SUCCESS",
	CREATED_FAILED:"CREATED_FAILED",
	UPDATED_SUCCESS:"UPDATED_SUCCESS",
	DELETED_SUCCESS:"DELETED_SUCCESS"

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
					type:PermissionActionType.SET_ROUTELIST_FAILED,
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
			console.log(resp.data.message)
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
					type:PermissionActionType.CREATED_FAILED,
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