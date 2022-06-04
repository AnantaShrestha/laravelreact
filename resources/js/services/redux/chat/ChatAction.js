import {ChatActionType,NotificationActionType} from '../../types'

//chat list user action
export const ChatListUserAction = (data) => (dispatch)=>{
	return new Promise((resolve,reject)=>{
		let get=data ? '?page='+data.page+'&&length='+data.length+'&&search='+data.search: ''
		Api.get('/admin/user/chatListUser'+get).then(resp => {
			dispatch({ type: ChatActionType.CHAT_USER_LIST_SUCCESS, payload: resp.data })
			resolve(resp)
		}).catch(err => {
			if (err.resp) {
				dispatch({
					type: NotificationActionType.MESSAGE_OBJ, payload: {
						type: 'danger', message: err.response.data.message
					}
				})
			}
			reject(err)
		})
	})
}
//get online user
export const ChatOnlineUserAction =()=>(dispatch)=>{
	return new Promise((resolve,reject)=>{
		Api.get('/admin/chat/online').then(resp=>{
			dispatch({type:ChatActionType.CHAT_USER_ACTIVE_LIST_SUCCESS,payload:resp.data})
			resolve(resp)
		}).catch(err => {
			if (err.resp) {
				dispatch({
					type: NotificationActionType.MESSAGE_OBJ, payload: {
						type: 'danger', message: err.response.data.message
					}
				})
			}
			reject(err)
		})
	});
}
//get user message according to user id
export const ChatUserMessageAction = (userId) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.get('/admin/chat/'+userId).then(resp=>{
			dispatch({type:ChatActionType.CHAT_USER_MESSAGE_LIST_SUCCESS,payload:resp.data})
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
export const ChatUserMessageSendAction = (data) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		Api.post('/admin/chat/store',data).then(resp=>{
			dispatch({type:ChatActionType.CHAT_MESSAGE_CREATED_SUCCESS,payload:resp.data})
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