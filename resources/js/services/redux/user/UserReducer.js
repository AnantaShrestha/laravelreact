import {UserActionType} from '../../types'

const userState= {
	users:{},
	user:{},
	errors:{},
}

const UserReducer = (state=userState,action) =>{
    switch(action.type){
        case UserActionType.SET_USERS:
            return{
                ...state,
                users:action.payload.data
            }
            break;
        case UserActionType.USER_CREATED_SUCCESS:
            return{
                ...state,
				user:action.payload.data
            }
        break;
        case UserActionType.USER_EDIT_SUCCESS:
            return{
                ...state,
                user:action.payload.data
            }
        case UserActionType.USER_UPDATED_SUCCESS:
            return{
                ...state,
                user:action.payload.data
            }
        case UserActionType.USER_DELETED_SUCCESS:
            return {
				...state,
				users:state.users.filter(user => user.id != action.payload.id)
			}
        default:
            return state
            break;
    }
}
export default UserReducer;