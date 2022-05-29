import React, {useEffect,useState} from 'react'
import {useSelector} from "react-redux";
import {Navigate} from 'react-router-dom'
import SideBar from '@/components/admin/SideNav'
import TopHeader from '@/components/admin/TopHeader'
import FlashMessage from '@/components/admin/FlashMessage'
import checkPermission from '@/hooks/checkPermission'
const PrivateLayout = ({children}) =>{
	const {isLoggedIn,user} =useSelector(
		(state) => state.auth
	);
	const {access,viewPermissions} = checkPermission(isLoggedIn)
	const [socket,setSocket] = useState(null)
	return (
		<>
		<FlashMessage />
			{
				isLoggedIn ? 
				(
					<div className="body-wrapper">
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