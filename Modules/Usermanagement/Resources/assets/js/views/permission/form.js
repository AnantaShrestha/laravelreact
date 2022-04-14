import React,{useEffect,useState} from 'react'
import {Link,useParams } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from "react-router";
import {RouteListAction,CreatePermissionAction,EditPermissionAction,UpdatePermissionAction} from '@/services/redux/permission/PermissionAction'
import useForm from '@/hooks/useForm'
import Button from '@/components/admin/Button'

const PermissionForm =()=>{
	//navigate
	const navigate=useNavigate()
	//dispatch
	const dispatch=useDispatch()
	//param
	const {id}=useParams()
	const isAddMode = !id
	//use form
	const validation={
		name:{
			required:true
		}
	}
	//form submit callback
	const permissionForm = () =>{
		if(Object.keys(errors).length  === 0){
			dispatch(isAddMode ? CreatePermissionAction(values,navigate) : UpdatePermissionAction(values,id,navigate) );
		}
	}
	const {isLoading,isDisable,values,setValues,errors,handleChange,handleSubmit} = useForm(permissionForm,validation);

	//use effect
	useEffect(() => {        
		dispatch(RouteListAction())
		
	 },[]);
	useEffect(()=>{
		if(!isAddMode){
			dispatch(EditPermissionAction( id))
		}
	},[])
	//selector
	const routeLists=useSelector((state) => state.permission.routeLists)
	const permission=useSelector((state)=>state.permission.permission)
	useEffect(()=>{
		if(!isAddMode){
			setValues({
				...values,
				name:permission.name || '',
				access_uri:permission.access_uri || []
			})
		}
	},[permission])
	//get route list
	return (
		<div className="content-body">
			<>
			<div className="page-heading-wrapper">
				<div className="page-title-wrapper">
					<h1>{id ? 'Edit Permission' : 'Create Permission'}</h1>
				</div>
				<div className="action-wrapper">
					<Link to="/admin/permission" className="btn-warning">Back</Link>
				</div>
			</div>
			<div className="content-box-wrapper">
				<form method='post' onSubmit={handleSubmit}>
					<div className="form-wrapper">
						<div className="form-row">
							<div className="form-label">
								<label>Permission Name</label>
							</div>
							<div className="form-control">
								<input value={values.name || ''}  name="name"  placeholder="Permission Name" type="text" className={`form-input ${errors?.name && 'invalid'}`} onChange={handleChange} />
								{
										errors?.name && (<div className="validation-wrapper"><span>{errors.name}</span></div>)
								}
							</div>
						</div>
						<div className="form-permission-list-wrapper">
							{
								Object.entries(routeLists).map(([title,value],i)=>{
									return(
									
										<div className="permission-check-item-wrapper" key={i}>
											<>
											<div className="permission-check-header">
												<h2>{title}</h2>
											</div>
											<div className="permission-checklist">
												<ul>
													{
														Object.entries(value).map(([type,route],index)=>{
															return(
																<li key={index}>
																	<>
																	<div className="checklist-wrapper">
																		{
																			isAddMode ? 
																			(<input  name="access_uri" value={route} type="checkbox" onChange={handleChange}   />)
																			:
																			(
																				values.access_uri && values.access_uri.includes(route) ? 
																				(<input checked  name="access_uri" value={route} type="checkbox" onChange={handleChange}   />)
																				:
																				(<input  name="access_uri" value={route} type="checkbox" onChange={handleChange}   />)
																			)
																		}
																		<span>{type} {title}</span>
																	</div>
																	</>
																</li>	
															)
														})
													}
												</ul>
											</div>
											</>
										</div>	
									)
								})
							}
						</div>
						<div className="form-row">
							<div className="form-label">
							</div>
							<div className="form-control form-action">
								<Button isLoading={isLoading} isDisable={isDisable} type="submit" className="btn-success" name={!isAddMode ? 'Update' : 'Create'} />
							</div>
						</div>
					</div>
				</form>
			</div>
			</>
		</div>
	);
}
export default PermissionForm;