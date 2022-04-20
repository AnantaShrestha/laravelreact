import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {FaTrashAlt,FaPen} from 'react-icons/fa'
import DataTable from '@/components/admin/DataTable'
import {UserListAction} from '@/services/redux/user/UserAction'

const UserList = () =>{
	const dispatch = useDispatch()
	const userList =useSelector((state) =>state.user.users)
	useEffect(()=>{   
		dispatch(UserListAction())
	},[])

	const columns=[
		{
			key:'name',
			title:'Full Name',
			render:(row)=>{
				return(
					<>
						<span>{row.name}</span>
					</>
				)
			}
		},
		{
			key:'username',
			title:'Username',
			render:(row)=>{
				return(
					<>
						<span>{row.username}</span>
					</>
				)
			}
		},
		{
			key:'email',
			title:'Email',
			render:(row)=>{
				return(
					<>
						<span>{row.email}</span>
					</>
				)
			}
		},
		{
			key:'roles',
			title:'Role',
			render:(row)=>{
				return(
					<>
					<div className="table-permission-list">
							<>
							{
								row.roles && Object.entries(row.roles).map(([key,role],index)=>{
									return(
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
			key:'action',
			title:'Action',
			render:(row)=>{
				return(
					<>
						<span></span>
					</>
				)
			}
		}
	]
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
					<DataTable columns={columns} rows={userList} />
				</div>
			</div>
		</div>
    )
}
export default UserList