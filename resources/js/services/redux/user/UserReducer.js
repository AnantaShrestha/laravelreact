import {UserActionType} from './UserAction'
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
        default:
            return state
            break;
    }
}
export default UserReducer;