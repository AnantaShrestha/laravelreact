import {NotificationActionType} from '../notification/notificationAction'
export const LogActionType ={
	SET_LOG:'SET_LOG'
}


//log list

export const LogListAction = (data) => (dispatch) =>{
	return new Promise((resolve,reject)=>{
		let get=data ? '?page='+data.page+'&&length='+data.length+'&&search='+data.search : ''
		Api.get('/admin/log'+get).then(resp=>{
			dispatch({
				type:LogActionType.SET_LOG,
				payload:resp.data
			})
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