import React,{useState,useEffect,useRef} from 'react'
const CheckBox = (props) =>{
	const checkBox= useRef(null)
	const {handleChange,name,value,selectedValues,multiple,className,id}=props
	const [checkedValues,setCheckedValues]=useState([])
	useEffect(()=>{
		if(selectedValues!=null)
			setCheckedValues(selectedValues)
	},[selectedValues])
	useEffect(()=>{
		if(checkedValues && checkedValues.includes(value))
			 checkBox.current.checked =true
		else
			checkBox.current.checked =false
	},[checkedValues])
	return(
		<>
			<input id={id} ref={checkBox} className={className}  name={name} value={value} type={multiple ? 'checkbox' : 'radio'} onChange={handleChange}  />	
		</>
	)
}
export default CheckBox



