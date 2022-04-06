import React from 'react'
import {Link } from "react-router-dom";
const PermissionList =()=>{
	return (
		<div className="content-body">
			<div className="page-heading-wrapper">
				<div className="page-title-wrapper">
					<h1>Permission</h1>
				</div>
				<div className="action-wrapper">
					<Link to="/admin/permission/create" className="btn-success">Create</Link>
				</div>
			</div>
		</div>
	);
}
export default PermissionList;