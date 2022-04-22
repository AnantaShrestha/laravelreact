import {lazy} from 'react'
import MenuList from '../views/menu/list'

export default[
	{
		path:'/admin/menu',
		exact:true,
		auth:true,
		component:<MenuList />
	},
	
];