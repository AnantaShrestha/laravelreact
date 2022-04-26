import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaPen } from 'react-icons/fa'
import DataTable from '@/components/admin/DataTable'
import { UserListAction,DeleteUserAction } from '@/services/redux/user/UserAction'
import useForm from '@/hooks/useForm'
const UserList = () => {
	const dispatch = useDispatch()
	const usersList = useSelector((state) => state.user.users)
	const searchForm = ()=> {
		setData({...data,'search':values.search})
	}
	const {isLoading,isDisable,values,handleChange,handleSubmit} = useForm(searchForm);
	const [data,setData]=useState({
		length:10,
		page:1,
		search:values.search ?? ''
	})
	const handlePagination = (page) =>{
		setData({...data,'page':page})
	}
	useEffect(() => {
		dispatch(UserListAction(data))
	}, [data])
	const handleUserDeleteButton = (id)=>{
		dispatch(DeleteUserAction(id))
	}
	const columns = [
		{
			key: 'name',
			title: 'Full Name',
			render: (row) => {
				return (
					<>
						<span>{row.name}</span>
					</>
				)
			}
		},
		{
			key: 'username',
			title: 'Username',
			render: (row) => {
				return (
					<>
						<span>{row.username}</span>
					</>
				)
			}
		},
		{
			key: 'email',
			title: 'Email',
			render: (row) => {
				return (
					<>
						<span>{row.email}</span>
					</>
				)
			}
		},
		{
			key: 'roles',
			title: 'Role',
			render: (row) => {
				return (
					<>
						<div className="table-permission-list">
							<>
								{
									row.roles && Object.entries(row.roles).map(([key, role], index) => {
										return (
											<span key={index}>{role.name}</span>
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
			key: 'action',
			title: 'Action',
			render: (row) => {
				return (
					<>
						<div className="table-action-wrapper">
							<Link className="table-edit-btn" to={`/admin/user/edit/${row.id}`} ><FaPen /></Link>
							<button className="table-delete-btn" onClick={() => handleUserDeleteButton(row.id)}><FaTrashAlt /></button>
						</div>
					</>
				)
			}
		}
	]
	return (
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
					<DataTable columns={columns}
							   rows={usersList} 
							   handleSubmit={handleSubmit} 
							   handleChange={handleChange} 
							   isLoading={isLoading} 
							   isDisable={isDisable}
							   handlePagination={handlePagination} />
				</div>
			</div>
		</div>
	)
}
export default UserList