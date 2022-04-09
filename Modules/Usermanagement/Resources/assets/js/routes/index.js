import {lazy} from 'react'
import PermissionList from '../views/permission/list';
import PermissionForm from '../views/permission/form'
export default[
	{
		path:'/admin/permission',
		exact:true,
		auth:true,
		component:<PermissionList />
	},
	{
		path:'/admin/permission/create',
		exact:true,
		auth:true,
		component:<PermissionForm />
	},
	{
		path:'/admin/permission/edit/:id',
		exact:true,
		auth:true,
		component:<PermissionForm />
	}
];