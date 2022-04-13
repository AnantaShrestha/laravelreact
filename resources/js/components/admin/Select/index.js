import React,{useState,useEffect} from 'react'
const Select = (props) =>{
	const {multiple,datas,className,handleChange}=props
	const  [showDropdown,setDropDown] = useState(false)
	const [checkedValues,value]=useState([])
	return(
		<>
			<div className="select-wrapper">
				<div className="selected-items">
					<span onClick={() =>setDropDown(!showDropdown)} className="select-placeholder">Select</span>
				</div>
				<div className="select-options" style={{display: showDropdown ? 'block' : 'none' }}>
							{
								Object.entries(datas).map(([key,data],i)=>{
									return(
										<div key={i} className="select-option">
											<input name="permissions" onChange={handleChange} id={data.id} value={data.id} className='select-input' type="checkbox" />
											<label htmlFor={data.id}>{data.name}</label>
										</div>
									)
								})
							}
				</div>
			</div>
		</>
	)
}

export default Select