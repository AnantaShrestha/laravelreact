import {lazy} from 'react'
import PermissionList from '../views/permission/list'
import PermissionForm from '../views/permission/form'
import RoleList from '../views/role/list'
import RoleForm from '../views/role/form'
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
	},
	{
		path:'/admin/role',
		exact:true,
		auth:true,
		component:<RoleList />
	},
	{
		path:'/admin/role/create',
		exact:true,
		auth:true,
		component:<RoleForm/>
	},
	{
		path:'/admin/role/edit/:id',
		exact:true,
		auth:true,
		component:<RoleForm />
	}
];