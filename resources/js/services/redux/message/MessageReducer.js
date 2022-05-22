import {MessageActionType} from '../../types'
const messageState= {
	messages:{},
}

const MessageReducer = (state=messageState,action) =>{
	switch(action.type){
		case MessageActionType.SET_USER_MESSAGE:
			return{
				...state,
				messages:action.payload.data
			}
			break;
		
		default:
			return state
			break;
	}
}	

export default MessageReducer