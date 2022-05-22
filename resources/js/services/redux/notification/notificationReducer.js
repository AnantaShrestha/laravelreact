import {NotificationActionType} from '../../types'
const notificationState = {
	message_obj:{}
}

const NotificationReducer = (state=notificationState,action) =>{
	switch(action.type){
		case NotificationActionType.MESSAGE_OBJ :
			return{
				...state,
				message_obj:{
					type:action.payload.type,
					message:action.payload.message
				}
			}
		default:
			return state
	}
}

export default NotificationReducer