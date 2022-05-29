import {RoleActionType} from '../../types'
const roleState= {
	roles:{},
	role:{},
	errors:{},
}


const RoleReducer = (state=roleState,action) =>{
	switch(action.type){
		case RoleActionType.SET_ROLES:
			return{
				...state,
				roles:action.payload.data
			}
		case RoleActionType.ROLE_CREATED_SUCCESS:
			return {
				...state,
				role:action.payload.data
			}
		case RoleActionType.ROLE_EDIT_SUCCESS:
			return{
				...state,
				role:action.payload.data
			}
		case RoleActionType.ROLE_UPDATED_SUCCESS:
			return{
				...state,
				role:action.payload.data
			}
		case RoleActionType.ROLE_DELETED_SUCCESS:
			return {
				...state,
				roles:state.roles.filter(role => role.id != action.payload.id)
			}
			break
		default:
			return state;
	}
}

export default RoleReducer