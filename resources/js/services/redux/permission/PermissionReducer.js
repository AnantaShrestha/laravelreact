import {PermissionActionType} from './PermissionAction'
const permissionState= {
	routeLists:{},
	permissions:{},
	permission:{},
	errors:{},
}

const PermissionReducer = (state=permissionState,action) =>{
	switch(action.type){
		case PermissionActionType.SET_ROUTELIST:
			return{
				...state,
				routeLists:action.payload.data
			}
			break;
		case PermissionActionType.SET_PERMISSIONS:
			return{
				...state,
				permissions:action.payload.data
			}
			break;
		case PermissionActionType.CREATED_SUCCESS:
			return{
				...state,
				permission:action.payload.data
			}
			break;
		case PermissionActionType.CREATED_FAILED:
			return{
				...state,
				errors:action.payload.errors,
			}
			break;
		case PermissionActionType.EDIT_SUCCESS:
			return{
				...state,
				permission:action.payload.data
			}
			break;
		case PermissionActionType.EDIT_FAILED:
			return{
				...state,
				errors:action.payload.errors,
			}
			break;
		case PermissionActionType.UPDATE_SUCCESS:
			return{
				...state,
				permission:action.payloas.data
			}
			break;
		case PermissionActionType.UPDATE_FAILED:
			return{
				...state,
				errors:action.payload.errors,
			}
			break;
		case PermissionActionType.DELETED_SUCCESS:
    		return{
    			...state,
    			permissions:state.permissions.filter(permission => permission.id != action.payload.id)
    		}
    		break
    	case PermissionActionType.DELETE_FAILED:
    		return{
				...state,
				errors:action.payload.errors,
			}
			break;
		default:
			return state
			break;
	}
}	

export default PermissionReducer