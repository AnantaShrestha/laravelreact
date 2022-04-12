import React, {useEffect} from 'react'
import {Link } from "react-router-dom"
import {useDispatch,useSelector} from "react-redux";
import {FaTrashAlt,FaPen} from 'react-icons/fa'

const RoleList = () =>{
	return(
		<div className="content-body">
			<div className="page-heading-wrapper">
				<div className="page-title-wrapper">
					<h1>Role</h1>
				</div>
				<div className="action-wrapper">
					<Link to="/admin/role/create" className="btn-success">Create</Link>
				</div>
			</div>
			<div className="content-box-wrapper">
				<div className="table-wrapper">
				</div>
			</div>
		</div>
	)
}

export default RoleList