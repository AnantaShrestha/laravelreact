import React from 'react'
import {useSelector} from "react-redux";
import {Navigate} from 'react-router-dom'
import SideBar from '@/components/admin/SideNav'
import TopHeader from '@/components/admin/TopHeader'

const PrivateLayout = ({children}) =>{
	const isAuthenticate =useSelector(
		(state) => state.auth.isLoggedIn
	);
	return (
		<>
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