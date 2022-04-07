import React, {useState} from 'react'
import {useDispatch,useSelector} from "react-redux";
import { useNavigate } from "react-router";
import {Navigate} from 'react-router-dom'
import useForm from '@/hooks/useForm'
import Button from '@/components/admin/Button'
import { LoginAuthAction } from "@/services/redux/auth/AuthAction";
const Login = (props) =>{
	const {login} =props
	const authImage='/images/loginimage.svg'
	const navigate =useNavigate()
	const dispatch=useDispatch()
	const validation={
  		username:{
  			required:true
  		},
  		password:{
  			required:true
  		}
  	}
	const formLogin = () => {
		if(Object.keys(errors).length == 0)
			dispatch(LoginAuthAction(values,navigate))
  	}
	const {isLoading,isDisable,values,errors,handleChange,handleSubmit} = useForm(formLogin,validation);
	const isAuthenticate = useSelector(
		(state) => state.auth.isLoggedIn
	)
	return (
		<>

		  {
		  	!isAuthenticate ? 
		  	(

		  		<div className="auth-wrapper">
					<div className="flex-row">
						<div className="auth-image">
						    <img src={authImage} />
						</div>
						<div className="auth-form">
							<form method="post" onSubmit={handleSubmit}>
								<div className="auth-row">
									<label>Username</label>
									<input type="text" name="username" placeholder="Username" className={`form-control ${errors.username && 'invalid'}`} onChange={handleChange} rules="required" />
									{
										errors?.username && (<div className="validation-wrapper"><span>{errors.username}</span></div>)
									}
								</div>
								<div className="auth-row">
									<label>Password</label>
									<input type="password" name="password" placeholder="Password" className={`form-control ${errors.password && 'invalid'}`}  onChange={handleChange} rules="required"  />
									{
										errors?.password && (<div className="validation-wrapper"><span>{errors.password}</span></div>)
									}
								</div>
								<div className="auth-action-wrapper">
									<Button isLoading={isLoading} isDisable={isDisable} type="submit" name="Login" className="auth-btn" />
								</div>
							</form>
						</div>
					</div>
				</div>
		  	) :
		  	(<Navigate to="/admin/dashboard"></Navigate>)
		  }
		</>
	)
}


export default Login