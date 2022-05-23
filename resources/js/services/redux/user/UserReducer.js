import {UserActionType} from '../../types'

const userState= {
	users:{},
	user:{},
    chatUsers:{},
	errors:{},

}

const UserReducer = (state=userState,action) =>{
    switch(action.type){
        case UserActionType.SET_USERS:
            return{
                ...state,
                users:action.payload.data
            }

        case UserActionType.SET_CHAT_USERS:
            return{
                ...state,
                chatUsers:action.payload.data
            }
        case UserActionType.USER_CREATED_SUCCESS:
            return{
                ...state,
				user:action.payload.data
            }
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
    }
}
export default UserReducer;