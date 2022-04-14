import {RoleActionType} from './RoleAction'
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
			break;
		case RoleActionType.CREATED_SUCCESS:
			return {
				...state,
				roles:action.payload.data
			}
			break;
		case RoleActionType.EDIT_SUCCESS:
			return{
				...state,
				role:action.payload.data
			}
		case RoleActionType.UPDATED_SUCCESS:
			return{
				...state,
				role:action.payload.data
			}
		default:
			return state;
			break;
	}
}

export default RoleReducer