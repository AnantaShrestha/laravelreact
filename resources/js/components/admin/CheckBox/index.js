import React,{useState,useEffect} from 'react'
const CheckBox = (props) =>{
	const {handleChange,name,value,checked}=props
	const [checkedStatus,setCheckedStatus]=useState(false)
	useEffect(()=>{
		setCheckedStatus(checked)
	},[checked])
	return(
		<>
			{
				checkedStatus ?
					(<input  name={name} value={value} type="checkbox" onChange={handleChange}  defaultChecked  />) :
					(<input  name={name} value={value} type="checkbox" onChange={handleChange}   />)
			}

		</>
	)
}
export default CheckBox