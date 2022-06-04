import {combineReducers} from 'redux'

import NotificationReducer from '@/services/redux/notification/notificationReducer'
import AuthReducer from '@/services/redux/auth/AuthReducer'
import PermissionReducer from '@/services/redux/permission/PermissionReducer'
import RoleReducer from '@/services/redux/role/RoleReducer'
import UserReducer from '@/services/redux/user/UserReducer'
import LogReducer from '@/services/redux/log/LogReducer'
import ChatReducer from '@/services/redux/chat/ChatReducer'

const RootReducers = combineReducers({
   notification:NotificationReducer,
   auth:AuthReducer,
   permission:PermissionReducer,
   role:RoleReducer,
   user:UserReducer,
   log:LogReducer,
   chatState:ChatReducer
})

export default RootReducers