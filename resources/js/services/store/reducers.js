import {combineReducers} from 'redux'

import AuthReducer from '@/services/redux/auth/AuthReducer'
import PermissionReducer from '@/services/redux/permission/PermissionReducer'

const RootReducers = combineReducers({
   auth:AuthReducer,
   permission:PermissionReducer
})

export default RootReducers