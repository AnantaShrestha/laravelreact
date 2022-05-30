import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {Navigate} from 'react-router-dom'
import SideBar from '@/components/admin/SideNav'
import TopHeader from '@/components/admin/TopHeader'
import FlashMessage from '@/components/admin/FlashMessage'
import checkPermission from '@/hooks/checkPermission'
import {connectedToSocket} from '@/socket/services'
const PrivateLayout = ({children}) =>{
	const {isLoggedIn,user} =useSelector(
		(state) => state.auth
	);
	const {access,viewPermissions} = checkPermission(isLoggedIn)
	useEffect(()=>{
		connectedToSocket(user.id)
	},[])
	return (
		<>
		<FlashMessage />
			{
				isLoggedIn ? 
				(
					<div className="body-compose">
						<SideBar />
						<div className="main-content-wrapper">
							<TopHeader />
							<div className="content-box">
								{
									access ? children : (
										<div className="permission-denied">
											<h1>Permission Denied</h1>
										</div>
									)
								}
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