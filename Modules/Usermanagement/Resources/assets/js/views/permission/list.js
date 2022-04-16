import React, {useEffect} from 'react'
import {Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {FaTrashAlt,FaPen} from 'react-icons/fa'
import {PermissionsListAction,DeletePermissionAction} from '@/services/redux/permission/PermissionAction'
import DataTable from '@/components/admin/DataTable'
const PermissionList =()=>{
	const dispatch = useDispatch()
	const permissionsList =useSelector((state) =>state.permission.permissions)
	useEffect(()=>{   
		dispatch(PermissionsListAction())
	},[])
	//table columns
	const columns=[
		{
			key:'name',title:'Permisssion Name',
			render: (row) =>{
				return(
					<span>{row.name}</span>
				)
			}
		},
		{
			key:'access_uri',title:'Access Uri',
			render:(row)=>{
				return(
					<span>{row.access_uri.join(',')}</span>
				)
			}
		},
		{
			key:'action',
			title:'Action',
			render: (row) =>{
				return (
					<div className="table-action-wrapper">
						<Link className="table-edit-btn" to={`/admin/permission/edit/${row.id}`} ><FaPen /></Link>
			    		<button className="table-delete-btn" onClick={() => handlePermissionDeleteButton(row.id)} ><FaTrashAlt /></button>
			    	</div>
				)
			}
  			
		}
	]
	const handlePermissionDeleteButton = (id) =>{
		dispatch(DeletePermissionAction(id))
	}
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
			<div className="content-box-wrapper">
				<div className="table-wrapper">
					<DataTable columns={columns} rows={permissionsList} />
				</div>
			</div>
		</div>
	);
}
export default PermissionList;