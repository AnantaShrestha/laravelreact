import {PermissionActionType} from '../../types'

const permissionState= {
	routeLists:{},
	permissions:{},
	permission:{},
	errors:{},
}

const PermissionReducer = (state=permissionState,action) =>{
	switch(action.type){
		case PermissionActionType.PERMISSION_ROUTE_LIST:
			return{
				...state,
				routeLists:action.payload.data
			}
		case PermissionActionType.PERMISSION_PAGINATION:
			return{
				...state,
				permissions:action.payload.data
			}
		case PermissionActionType.PERMISSION_CREATED_SUCCESS:
			return{
				...state,
				permission:action.payload.data
			}
		case PermissionActionType.PERMISSION_EDIT_SUCCESS:
			return{
				...state,
				permission:action.payload.data
			}
		case PermissionActionType.PERMISSION_UPDATE_SUCCESS:
			return{
				...state,
				permission:action.payload.data
			}
		case PermissionActionType.PERMISSION_DELETED_SUCCESS:
    		return{
    			...state,
    			permissions:state.permissions.filter(permission => permission.id != action.payload.id)
    		}
    		break
		default:
			return state
	}
}	

export default PermissionReducer