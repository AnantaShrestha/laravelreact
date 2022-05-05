import {lazy} from 'react'
import LogList from '../views/log/list'

export default[
	{
		path:'/admin/log',
		exact:true,
		auth:true,
		component:<LogList />
	},
	
];