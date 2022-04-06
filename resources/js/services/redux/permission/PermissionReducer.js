import {PermissionActionType} from './PermissionAction'
const permissionState= {
	routeLists:{},
	permissions:{},
	errors:{},
	message:''
}

const PermissionReducer = (state=permissionState,action) =>{
	switch(action.type){
		case PermissionActionType.SET_ROUTELIST:
			return{
				...state,
				routeLists:action.payload.data
			}
		case PermissionActionType.CREATED_SUCCESS:
			setTimeout(function(){
				navigate('/admin/permission')
			},2500)
			return{
				...state,
				permissions:action.payload.data,
				message:action.payload.messge
			}
		case PermissionActionType.CREATED_FAILED:
			console.log(action.payload)
			return{
				...state,
				errors:action.payload.errors,
				message:action.payload.message
			}
		default:
			return state
	}
}	

export default PermissionReducer