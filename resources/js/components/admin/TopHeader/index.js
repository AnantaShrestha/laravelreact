import React from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import { FaSignInAlt} from 'react-icons/fa';
import {LogoutAuthAction} from '@/services/redux/auth/AuthAction'

const TopHeader = (props) =>{
	const {logout}=props
	const navigate=useNavigate()
	const dispatch=useDispatch()
	
	return (
		<>
			<div className="top-header-wrapper">
				<div className="top-right-side">
					<button className="logout-btn" onClick={() => {
		                dispatch(LogoutAuthAction(navigate))
		              }}>Logout <FaSignInAlt /></button>
				</div>

			</div>
		</>
	);
}

export default TopHeader;
