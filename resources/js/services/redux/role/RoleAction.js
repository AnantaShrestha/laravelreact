import {NotificationActionType} from '../notification/notificationAction'
export const RoleActionType={
	SET_ROLES:"SET_ROLES",
	SET_ROLE:"SET_ROLE",
	ROLE_SET_FAILED:"SET_FAILED",
	ROLE_CREATED_SUCCESS:"CREATED_SUCCESS",
	ROLE_EDIT_SUCCESS:"UPDATED_SUCCESS",
	ROLE_UPDATE_SUCCESS:"UPDATED_SUCCESS",
	ROLE_DELETED_SUCCESS:"DELETED_SUCCESS",
}
//get role
export const RoleListAction = () => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.get('admin/role/').then(resp=>{
			dispatch({type:RoleActionType.SET_ROLES,payload:resp.data})
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:RoleActionType.ROLE_SET_FAILED,
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
//create role action
export const CreateRoleAction = (roleFormState,navigate) => (dispatch)=>{
	return new Promise((resolve,reject)=>{
		Api.post('admin/role/store',roleFormState).then(resp=>{
			dispatch({type:RoleActionType.ROLE_CREATED_SUCCESS,payload:resp.data})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			navigate('/admin/role')
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:RoleActionType.ROLE_SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
				
			}
			reject(err)
		})
	})
}
//edit role action
export const EditRoleAction = (id) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.get('admin/role/edit/'+id).then(resp=>{
			dispatch({
				type:RoleActionType.ROLE_EDIT_SUCCESS,payload:resp.data
			})
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:RoleActionType.ROLE_SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
			}
			reject(err)
		})
	})
}

//update role action
export const UpdateRoleAction = (roleFormState,id,navigate) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.put('admin/role/edit/'+id,roleFormState).then(resp=>{
			dispatch({type:RoleActionType.ROLE_UPDATE_SUCCESS,payload:resp.data})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			navigate('/admin/role')
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:RoleActionType.ROLE_SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})	
			}
			reject(err)
		})
	})
}

//delete role action
export const DeleteRoleAction = (id) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.delete('admin/role/delete/'+id).then(resp=>{
			dispatch({
				type:RoleActionType.ROLE_DELETED_SUCCESS,
				payload:{id:id}
			})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'danger',message:resp.data.message
			}})
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:RoleActionType.ROLE_SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
				
			}
			reject(err)
		})
	})
}