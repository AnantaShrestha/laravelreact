import React from 'react'
import NavList from './NavList'
const SideBar = () =>{
	const name=JSON.parse(localStorage.getItem('token')).user.name
	return (
		<>
			<div className="sidebar-wrapper">
				<div className="sidebar-heading">
					<div className="sidebar-image">
						<img src="/images/user.png" />
					</div>
					<div className="sidebar-title">
						<h2>{name}</h2>
					</div>
				</div>
				<NavList />
			</div>
		</>
	);
}
export default SideBar;