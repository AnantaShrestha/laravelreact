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

//create role action
export const CreateRoleAction = (roleFormState,navigate) => (dispatch)=>{
	return new Promise((resolve,reject)=>{
		Api.post('admin/role/store',roleFormState).then(resp=>{
			dispatch({type:RoleActionType.CREATED_SUCCESS,payload:resp.data})
			dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
				type:'success',message:resp.data.message
			}})
			navigate('/admin/permission')
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