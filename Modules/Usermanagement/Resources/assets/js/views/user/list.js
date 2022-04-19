import React from 'react'
import {Link} from "react-router-dom";
import DataTable from '@/components/admin/DataTable'

const UserList = () =>{
    return(
        <div className="content-body">
			<div className="page-heading-wrapper">
				<div className="page-title-wrapper">
					<h1>User</h1>
				</div>
				<div className="action-wrapper">
					<Link to="/admin/user/create" className="btn-success">Create</Link>
				</div>
			</div>
			<div className="content-box-wrapper">
				<div className="table-wrapper">
					
				</div>
			</div>
		</div>
    )
}
export default UserList