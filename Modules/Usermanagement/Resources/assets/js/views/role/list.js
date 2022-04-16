import React, {useEffect} from 'react'
import {Link } from "react-router-dom"
import {useDispatch,useSelector} from "react-redux";
import {FaTrashAlt,FaPen} from 'react-icons/fa'
import DataTable from '@/components/admin/DataTable'
import {RolesListAction,DeleteRoleAction} from '@/services/redux/role/RoleAction'

const RoleList = () =>{
	const dispatch = useDispatch()
	const rolesList =useSelector((state) =>state.role.roles)
	useEffect(()=>{   
		dispatch(RolesListAction())
	},[])
	const handleRoleDeleteButton = (id) =>{
		dispatch(DeleteRoleAction(id))
	}
	//table columns
	const columns=[
		{
			key:'name',title:'Role Name',
			render:(row)=>{
				return(
					<>
						<span>{row.name}</span>
					</>
				)
			}
		},
		{
			key:'permissions',title:'Permissions',
			render:(row)=>{
				return(
					<>
						<div className="table-permission-list">
							<>
							{
								row.permissions && Object.entries(row.permissions).map(([key,permission],index)=>{
									return(
										<span key={index}>{permission.name}</span>
									)
								})
							}
							</>
						</div>
					</>
				)
	
			}
		},
		{
			key:'action',title:'Action',
			render: (row) =>{
				return (
					<>
						<div className="table-action-wrapper">
							
								<Link className="table-edit-btn" to={`/admin/role/edit/${row.id}`} ><FaPen /></Link>
					    		<button className="table-delete-btn" onClick={() => handleRoleDeleteButton(row.id)}><FaTrashAlt /></button>
					    	
			    		</div>
			    	</>
				)
			}
  			
		}
	];
	
	return(
		<>
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
						<DataTable columns={columns} rows={rolesList} />
					</div>
				</div>
			</div>
		</>
	)
}

export default RoleList