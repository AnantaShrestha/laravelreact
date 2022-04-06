import React,{useEffect,useState} from 'react'
import {Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from "react-router";
import {RouteListAction,CreatePermissionAction} from '@/services/redux/permission/PermissionAction'
import Button from '@/components/admin/Button'

const PermissionForm =()=>{
	//navigate
	const navigate=useNavigate()
	//dispatch
	const dispatch=useDispatch()
	//selector
	const routeLists=useSelector((state) => state.permission.routeLists)
	//state
	const [permissionFormState,setPermissionFormState] = useState({
		name:'',
		access_uri:[]
	})
	//get route list
	 useEffect(() => {
	 	let isMounted = true;          
		dispatch(RouteListAction())
	 },[dispatch]);
	 //submit permission form
	const handleCheckBox = (e) =>{
		const { value, checked } = e.target;
		const { access_uri } = permissionFormState;
		 if (checked) {
		    setPermissionFormState({
		        access_uri: [...access_uri, value],
		    });
		}
		
	}
	const handlePermissionForm = (e) =>{
	 	e.preventDefault()
	 	dispatch(CreatePermissionAction(permissionFormState,navigate))
	}
	return (
		<div className="content-body">
			<>
			<div className="page-heading-wrapper">
				<div className="page-title-wrapper">
					<h1>Create Permission</h1>
				</div>
				<div className="action-wrapper">
					<Link to="/admin/permission" className="btn-warning">Back</Link>
				</div>
			</div>
			<div className="content-box-wrapper">
				<form method='post' onSubmit={handlePermissionForm}>
					<div className="form-wrapper">
						<div className="form-row">
							<div className="form-label">
								<label>Permission Name</label>
							</div>
							<div className="form-control">
									<input name="name"  placeholder="Permission Name" type="text" className="form-input" onChange={(e)=>{
										const name=e.target.value
										setPermissionFormState({...permissionFormState,...{name}})
									}} />
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
																		<input name="access_uri" value={route} type="checkbox" onChange={handleCheckBox} />
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
								<Button type="submit" className="btn-success" name="Create" />
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