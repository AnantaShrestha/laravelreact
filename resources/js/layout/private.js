import React, {useEffect,useState} from 'react'
import {useSelector,useDispatch} from "react-redux";
import {Navigate,useLocation,useNavigate} from 'react-router-dom'
import SideBar from '@/components/admin/SideNav'
import TopHeader from '@/components/admin/TopHeader'
import FlashMessage from '@/components/admin/FlashMessage'
import {UserPermissionAction } from '@/services/redux/user/UserAction'
const PrivateLayout = ({children}) =>{
	const location=useLocation()
	const navigate=useNavigate()
	const dispatch=useDispatch()
	const hostName=window.location.hostname
	const [viewPermissions,setViewPermissions]=useState([])
	const isAuthenticate =useSelector(
		(state) => state.auth.isLoggedIn
	);
	if(isAuthenticate){
		const userPermission =useSelector(
			(state) => state.user.userPermission
		)
		useEffect(()=>{
			dispatch(UserPermissionAction())
		},[])
		useEffect(()=>{
			setViewPermissions([])
			userPermission && userPermission?.map((permission,key)=>{
				let path =permission.replace(hostName+'/api','')
				setViewPermissions(viewPermissions=>[...viewPermissions,path])
			})
		},[userPermission])
		

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