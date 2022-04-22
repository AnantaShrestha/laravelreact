import {lazy} from 'react'
import UsermanagementRoutes from '../../../Modules/Usermanagement/Resources/assets/js/routes'
import SettingRoutes from '../../../Modules/Setting/Resources/assets/js/routes'
import Dashboard from '@/views/admin/dashboard'
import Login from '@/views/admin/auth/login'
const routes=[
	{
		path:'/admin/login',
		exact:true,
		auth:false,
		component:<Login />
	},
	{
		path:'/admin/dashboard',
		exact:true,
		auth:true,
		component:<Dashboard />
	}
];
export default [...routes,...UsermanagementRoutes,...SettingRoutes]