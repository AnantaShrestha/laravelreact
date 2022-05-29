import {MessageActionType} from '../../types'
const messageState= {
	messages:{},
	message:[]
}

const MessageReducer = (state=messageState,action) =>{
	switch(action.type){
		case MessageActionType.SET_USER_MESSAGE:
			return{
				...state,
				messages:action.payload.data
			}
		case MessageActionType.MESSAGE_CREATED_SUCCESS:
			return{
				...state,
				message:action.payload.data
			}
		default:
			return state
	}
}	

export default MessageReducer