import  {LogActionType} from '../../types'
const logState= {
	logs:{},
}

const LogReducer = (state=logState,action) =>{
	switch(action.type){
		case LogActionType.SET_LOG:
			return{
				...state,
				logs:action.payload.data
			}
			break
		default:
			return state
			break;

	}
}

export default LogReducer