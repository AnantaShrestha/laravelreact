import {RoleActionType} from './RoleAction'
const roleState= {
	roles:{},
	role:{},
	errors:{},
}


const RoleReducer = (state=roleState,action) =>{
	switch(action.type){
		case RoleActionType.CREATED_SUCCESS:
			return {
				...state,
				roles:action.payload.data
			}
			break;
		default:
			return state;
			break;
	}
}

export default RoleReducer