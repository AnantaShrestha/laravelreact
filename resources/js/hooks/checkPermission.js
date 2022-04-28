import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux";
import { UserPermissionAction } from '@/services/redux/auth/AuthAction';

const checkPermission = (isAuthenticate) =>{
	const dispatch=useDispatch()
	const location=window.location
	let pathName=location.pathname
	const [viewPermissions,setViewPermissions]=useState([])
	const [access,setAccess] = useState(false)
	const userPermission=useSelector((state)=>state.auth.userPermission)
		useEffect(()=>{
			if(isAuthenticate)
				dispatch(UserPermissionAction())
		},[])
		useEffect(()=>{
			setViewPermissions([])
			userPermission && userPermission?.map((permission,key)=>{
				let path =  permission.replace(location.hostname+'/api','')
				setViewPermissions(viewPermissions=>[...viewPermissions,path])
			})
		},[userPermission])
		useEffect(()=>{
			if(pathName.endsWith('create')){
				pathName=pathName.replace('create','store')
			}
			pathName=pathName.replace(/[0-9]/g, '{id}')
			pathName == '/admin/dashboard' ||
			viewPermissions.includes('/admin/*') || 
			viewPermissions.includes(pathName+'/*') ||  
			viewPermissions.includes(pathName)
			 	? setAccess(true) : setAccess(false)
		},[pathName,viewPermissions])

	return{
		viewPermissions,
		access
	}
}

export default checkPermission;