import React,{useEffect} from 'react'
import {Link,useParams } from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from "react-router";

import useForm from '@/hooks/useForm'
import Button from '@/components/admin/Button'
import Select from '@/components/admin/Select'
import {CreateRoleAction,EditRoleAction,UpdateRoleAction} from '@/services/redux/role/RoleAction'
import {PermissionsListAction} from '@/services/redux/permission/PermissionAction'

const RoleForm = () =>{
	//navigate
	const navigate=useNavigate()
	//dispatch
	const dispatch=useDispatch()
	//param
	const {id}=useParams()
	const isAddMode = !id
	//form submit callback
	const roleForm = () =>{
		if(Object.keys(errors).length  === 0){
			isAddMode ? dispatch(CreateRoleAction(values,navigate)) : dispatch(UpdateRoleAction(values,id,navigate))
		}
	}
	const {isLoading,isDisable,values,setValues,setValidation,errors,handleChange,handleSubmit} = useForm(roleForm);

	//selector
	const permissionLists=useSelector((state)=>state.permission.permissions)
	const role=useSelector((state)=>state.role.role)
	useEffect(()=>{
		setValidation({
			name:{
				rules:'required'
			}
		})
		dispatch(PermissionsListAction())
	},[])
	useEffect(()=>{
		if(!isAddMode){
			dispatch(EditRoleAction(id))
		}
	},[])
	useEffect(()=>{
		if(!isAddMode){
			let permissions=[]
			role.permissions && Object.entries(role.permissions).map(([key,permission],i)=>{
				permissions.push(permission.id)
			})
			setValues({
				...values,
				name:role.name  || '',
				permissions:permissions || []
			}) 

		}
	},[role])
	return(
		<div className="content-body">
			<>
			<div className="page-heading-wrapper">
				<div className="page-title-wrapper">
					<h1>{id ? 'Edit Role' : 'Create Role'}</h1>
				</div>
				<div className="action-wrapper">
					<Link to="/admin/role" className="btn-warning">Back</Link>
				</div>
			</div>
			<div className="content-box-wrapper">
				<form className="global-form" method='post' onSubmit={handleSubmit}>
					<div className="form-wrapper">
						<div className="form-row">
							<div className="form-label">
								<label>Role Name</label>
							</div>
							<div className="form-control">
								<input value={values.name || ''}  name="name"  placeholder="Role Name" type="text" className={`form-input ${errors?.name && 'invalid'}`} onChange={handleChange} />
								{
									errors?.name && (<div className="validation-wrapper"><span>{errors.name}</span></div>)
								}
							</div>
						</div>
						<div className="form-row">
							<div className="form-label">
								<label>Permissions</label>
							</div>
							<div className="form-control">
								<Select name="permissions" multiple="true" datas={permissionLists} handleChange={handleChange} selectedValue={values.permissions}/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-label"></div>
							<div className="form-control form-action">
								<Button isLoading={isLoading} isDisable={isDisable} type="submit" className="btn-success" name={!isAddMode ? 'Update' : 'Create'} />
							</div>
						</div>
					</div>
				</form>
			</div>
			</>
		</div>
	)
}

export default RoleForm