import {combineReducers} from 'redux'

import NotificationReducer from '@/services/redux/notification/notificationReducer'
import AuthReducer from '@/services/redux/auth/AuthReducer'
import PermissionReducer from '@/services/redux/permission/PermissionReducer'
import RoleReducer from '@/services/redux/role/RoleReducer'
import UserReducer from '@/services/redux/user/UserReducer'

const RootReducers = combineReducers({
   notification:NotificationReducer,
   auth:AuthReducer,
   permission:PermissionReducer,
   role:RoleReducer,
   user:UserReducer
})

export default RootReducers