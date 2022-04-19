import {lazy} from 'react'
import PermissionList from '../views/permission/list'
import PermissionForm from '../views/permission/form'
import RoleList from '../views/role/list'
import RoleForm from '../views/role/form'
import UserList from '../views/user/list'
import UserForm from '../views/user/form'
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
	},
	{
		path:'/admin/user',
		exact:true,
		auth:true,
		component:<UserList />
	},
	{
		path:'/admin/user/create',
		exact:true,
		auth:true,
		component:<UserForm/>
	},
	{
		path:'/admin/user/edit/:id',
		exact:true,
		auth:true,
		component:<UserForm/>
	},
];