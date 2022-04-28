import React, {useState,useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux";
import {Navigate} from 'react-router-dom'
import SideBar from '@/components/admin/SideNav'
import TopHeader from '@/components/admin/TopHeader'
import FlashMessage from '@/components/admin/FlashMessage'
import { UserPermissionAction } from '../services/redux/auth/AuthAction';
const PrivateLayout = ({children}) =>{
	const dispatch=useDispatch()
	const location=window.location
	const isAuthenticate =useSelector(
		(state) => state.auth.isLoggedIn
	);
	if(isAuthenticate){
		const [viewPermissions,setViewPermissions]=useState([])
		const userPermission=useSelector((state)=>state.auth.userPermission)
		useEffect(()=>{
			dispatch(UserPermissionAction())
		},[])
		useEffect(()=>{
			setViewPermissions([])
			userPermission && userPermission?.map((permission,key)=>{
			let path =  permission.replace(location.hostname+'/api','')
							setViewPermissions(viewPermissions=>[...viewPermissions,path])
						})
		},[userPermission])
		console.log(viewPermissions)
	}
	return (
		<>
		<FlashMessage />
			{
				isAuthenticate ? 
				(
					<div className="body-wrapper">
						<SideBar />
						<div className="main-content-wrapper">
							<TopHeader />
							<div className="content-box">
								{children}
							</div>
						</div>
					</div>
				) :
				(<Navigate to="/admin/login"></Navigate>)
			}
			
		</>
	);
}

export default PrivateLayout;