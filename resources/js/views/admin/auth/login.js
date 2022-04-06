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
	const formLogin = () => {
		return dispatch(LoginAuthAction(values,navigate))
  	}
	const {isLoading,isDisable,values,errors,handleChange,handleSubmit} = useForm(formLogin);
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
									<input type="text" name="username" placeholder="Username" className="form-control" onChange={handleChange} rules="required" />
								</div>
								<div className="auth-row">
									<label>Password</label>
									<input type="password" name="password" placeholder="Password" className="form-control"  onChange={handleChange} rules="required"  />
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