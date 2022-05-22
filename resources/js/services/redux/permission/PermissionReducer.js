import {PermissionActionType} from '../../types'

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
		case PermissionActionType.PERMISSION_CREATED_SUCCESS:
			return{
				...state,
				permission:action.payload.data
			}
			break;
		case PermissionActionType.PERMISSION_EDIT_SUCCESS:
			return{
				...state,
				permission:action.payload.data
			}
			break;
		case PermissionActionType.PERMISSION_UPDATE_SUCCESS:
			return{
				...state,
				permission:action.payload.data
			}
			break;
		case PermissionActionType.PERMISSION_DELETED_SUCCESS:
    		return{
    			...state,
    			permissions:state.permissions.filter(permission => permission.id != action.payload.id)
    		}
    		break
		default:
			return state
			break;
	}
}	

export default PermissionReducer