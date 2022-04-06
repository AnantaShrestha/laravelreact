export const PermissionActionType={
	SET_ROUTELIST:"SET_ROUTELIST",
	SET_ROUTELIST_FAILED:"SET_ROUTELIST_FAILED",
	SET_PERMISSIONS:"SET_PERMISSIONS",
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
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:PermissionActionType.SET_ROUTELIST_FAILED,
					payload:err.response
				})
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
				type:PermissionActionType.CREATED_SUCCESS,
				payload:resp.date
			})
		}).catch(err=>{
			if(err.response){
				dispatch({
					type:PermissionActionType.CREATED_FAILED,
					payload:err.response.data
				})
			}
		})
	})
}