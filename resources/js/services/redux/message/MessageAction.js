import {MessageActionType,NotificationActionType} from '../../types'

//get user message according to user id
export const UserMessageAction = (userId) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.get('/admin/message/'+userId).then(resp=>{
			dispatch({
				type:MessageActionType.SET_USER_MESSAGE,payload:resp.data})
			resolve(resp)
		}).catch(err=>{
			if(err.response){
				dispatch({type:NotificationActionType.MESSAGE_OBJ,payload:{
					type:'danger',message:err.response.data.message
				}})
			}
			reject(err)
		})
	})
}

//store user message accordingh to user id
export const UserMessageSendAction = (userId) => (dispatch) =>{

	
}