import React, { useEffect,useState} from 'react'
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router";
import useForm from '@/hooks/useForm'
import Button from '@/components/admin/Button'
import Select from '@/components/admin/Select'

import {RoleListAction} from '@/services/redux/role/RoleAction'
import {CreateUserAction,EditUserAction,UpdateUserAction} from '@/services/redux/user/UserAction'
const UserForm = () => {
    //navigate
    const navigate = useNavigate()
    //dispatch
    const dispatch = useDispatch()
    //param
    const { id } = useParams()
    const isAddMode = !id
    const userForm = () => {
        if(Object.keys(errors).length  === 0){
           isAddMode ? dispatch(CreateUserAction(values,navigate)) : dispatch(UpdateUserAction(values,id,navigate))
        }
    }
    const { isLoading, isDisable, values,setValues,setValidation,errors,handleChange,handleSubmit } = useForm(userForm);

    const [rolesId,setRolesId]=useState([])

    const rolesList =useSelector((state) =>state.role.roles)
    const user= !isAddMode ? useSelector((state) => state.user.user) : []
    
    useEffect(()=>{
        setValidation({
            name: {
               rules:'required'
            },
            username: {
                rules:'required'
            },
            email:{
                rules:'required|email'
            },
            password:{
               rules:isAddMode ? 'required' : ''
            },
            password_confirmation:{
                rules:isAddMode ? 'required|confirm' :''
            }
        })
        dispatch(RoleListAction())
        if(!isAddMode){
            dispatch(EditUserAction(id))
        }
    },[])
 
    useEffect(()=>{
		if(!isAddMode){
            var ids=[]
            user.roles && Object.entries(user.roles).map(([key,role],i)=>{
                ids.push(role.id)
            })
            setRolesId(ids)
            setValues({
                ...values,
                name:user?.name  || '',
                username:user?.username || '',
                email:user?.email || '',
                phone_no:user?.phone_no || '',
                roles:ids || [],
            }) 
		}
	},[user])

    console.log(values)
    return (
        <div className="content-body">
            <>
                <div className="page-heading-wrapper">
                    <div className="page-title-wrapper">
                        <h1>{id ? 'Edit User' : 'Create User'}</h1>
                    </div>
                    <div className="action-wrapper">
                        <Link to="/admin/user" className="btn-warning">Back</Link>
                    </div>
                </div>
                <div className="content-box-wrapper">
                    <form method='post' onSubmit={handleSubmit}>
                        <div className="form-wrapper">
                            <div className="form-row">
                                <div className="form-label">
                                    <label>Full Name</label>
                                </div>
                                <div className="form-control">
                                    <input type="text" value={values.name ?? ''} name="name" className={`form-input ${errors?.name && 'invalid'}`} placeholder="Full Name" onChange={handleChange} />
                                    {
                                        errors?.name && (<div className="validation-wrapper"><span>{errors.name}</span></div>)
                                    }
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label">
                                    <label>Username</label>
                                </div>
                                <div className="form-control">
                                    <input type="text" value={values.username ?? ''} name="username" className={`form-input ${errors?.username && 'invalid'}`} placeholder="Username" onChange={handleChange} />
                                    {
                                        errors?.username && (<div className="validation-wrapper"><span>{errors.username}</span></div>)
                                    }
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label">
                                   <label>Email</label>     
                                </div>
                                <div className="form-control">
                                    <input type="email" value={values.email ?? ''} name="email" className={`form-input ${errors?.email && 'invalid'}`} placeholder="Email Address" onChange={handleChange} />
                                    {
                                        errors?.email && (<div className="validation-wrapper"><span>{errors.email}</span></div>)
                                    }
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label">
                                    <label>Phone Number</label>
                                </div>
                                <div className="form-control">
                                    <input type="text" value={values.phone_no ?? ''} name="phone_no" className={`form-input ${errors?.phone_no && 'invalid'}`} placeholder="Phone Number" onChange={handleChange} />
                                    {
                                        errors?.phone_no && (<div className="validation-wrapper"><span>{errors.phone_no}</span></div>)
                                    }
                                </div>
                            </div>
                           {
                             isAddMode && (
                                <>
                                 <div className="form-row">
                                    <div className="form-label">
                                        <label>Password</label>
                                    </div>
                                    <div className="form-control">
                                        <input type="password" name="password" className={`form-input ${errors?.password && 'invalid'}`} placeholder="Password" onChange={handleChange} />
                                        {
                                            errors?.password && (<div className="validation-wrapper"><span>{errors.password}</span></div>)
                                        }
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label">
                                        <label>Password Confirm</label>
                                    </div>
                                    <div className="form-control">
                                        <input type="password" name="password_confirmation" className={`form-input ${errors?.password_confirmation && 'invalid'}`} placeholder="Password Confirmation" onChange={handleChange} />
                                        {
                                            errors?.password_confirmation && (<div className="validation-wrapper"><span>{errors.password_confirmation}</span></div>)
                                        }
                                    </div>
                                </div>
                                </>

                            )
                           }
                            <div className="form-row">
                                <div className="form-label">
                                    <label>Role</label>
                                </div>
                                <div className="form-control">
                                    <Select 
                                        name="roles" 
                                        multiple="true" 
                                        datas={rolesList} 
                                        handleChange={handleChange}  
                                        selectedValues={rolesId ?? null}
                                        optionValue="name"
                                        optionKey="id"
                                    />
                                </div>
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
    )
}
export default UserForm