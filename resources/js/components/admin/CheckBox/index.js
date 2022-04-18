import React from 'react'
const CheckBox = (props) =>{
	const {handleChange,name,value,checked}=props
	const defaultChecked=checked ? true :false

	return(
		<>
			{
				
				<input  name={name} value={value} type="checkbox" onChange={handleChange}  />
				
			}

		</>
	)
}
export default CheckBox