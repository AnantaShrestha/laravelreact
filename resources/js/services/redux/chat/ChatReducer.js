import {ChatActionType} from '../../types'
const messageState= {
	messages:{},
	chatUserList:[],
	chatActiveUser:[],
	message:[]
}

const ChatReducer = (state=messageState,action) =>{
	switch(action.type){
		case ChatActionType.CHAT_USER_MESSAGE_LIST_SUCCESS:
			return{
				...state,
				messages:action.payload.data
			}
		case ChatActionType.CHAT_MESSAGE_CREATED_SUCCESS:
			return{
				...state,
				message:action.payload.data
			}
		case ChatActionType.CHAT_USER_ACTIVE_LIST_SUCCESS:
			return{
				...state,
				ChatActionUser:action.payload.data
			}
		case ChatActionType.CHAT_USER_LIST_SUCCESS:
			return{
				...state,
				chatUserList:action.payload.data
			}
		default:
			return state
	}
}	

export default ChatReducer