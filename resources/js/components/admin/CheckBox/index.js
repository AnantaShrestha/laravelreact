import React,{useState,useEffect} from 'react'
const CheckBox = (props) =>{
	const {handleChange,name,value,selectedValues,multiple,className}=props
	const [checkedValues,setCheckedValues]=useState([])
	const [checkedStatus,setCheckedStatus]=useState('')
	useEffect(()=>{
		setCheckedValues(selectedValues)
	},[selectedValues])
	useEffect(()=>{
		setCheckedStatus(false)
		 checkedValues.includes(value) ? setCheckedStatus('checked') : setCheckedStatus('')
	},[checkedValues])
	return(
		<>
			<input className={className}  name={name} value={value} type={multiple ? 'checkbox' : 'radio'} onChange={handleChange} checked={checkedStatus} />
		</>
	)
}
export default CheckBox



