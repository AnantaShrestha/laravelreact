import {NotificationActionType} from '../notification/notificationAction'
export const RoleActionType={
	SET_ROLES:"SET_ROLES",
	SET_ROLE:"SET_ROLE",
	SET_FAILED:"SET_FAILED",
	CREATED_SUCCESS:"CREATED_SUCCESS",
	EDIT_SUCCESS:"UPDATED_SUCCESS",
	UPDATE_SUCCESS:"UPDATED_SUCCESS",
	DELETED_SUCCESS:"DELETED_SUCCESS",
}
//get role
export const RolesListAction = () => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.get('admin/role/').then(resp=>{
			dispatch({type:RoleActionType.SET_ROLES,payload:resp.data})
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:RoleActionType.SET_FAILED,
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
			dispatch({type:RoleActionType.CREATED_SUCCESS,payload:resp.data})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			navigate('/admin/role')
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:RoleActionType.SET_FAILED,payload:err.response.data
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
				type:RoleActionType.EDIT_SUCCESS,payload:resp.data
			})
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:RoleActionType.SET_FAILED,payload:err.response.data
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
			dispatch({type:RoleActionType.UPDATE_SUCCESS,payload:resp.data})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:RoleActionType.SET_FAILED,payload:err.response.data
				})
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})	
			}
			reject(err)
		})
	})
}