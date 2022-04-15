import React,{useState,useEffect} from 'react'
const Select = (props) =>{
	const {multiple,datas,className,handleChange,selectedValue}=props
	const [showDropdown,setDropDown] = useState(false)
	const [checkedValues,setCheckedValue]=useState([])

	const handleClick = (e) =>{
		let value=e.target.lastChild.data
		let index =  checkedValues.indexOf(value);
		if (index > -1) {
			checkedValues.splice(index, 1);
		}else{
			setCheckedValue(checkedValues => [...checkedValues, value])
		}
		setDropDown(false)
	}
	return(
		<>
			<div className="select-wrapper">
				<div className="selected-items" onClick={() =>setDropDown(!showDropdown)}>
				{
					checkedValues.length > 0 ? 
					(
						<div className="selected-item-wrapper">
							{
								checkedValues.map((value,key)=>{
									return(
										<div key={key} className="select-item">
											<span>{value}</span>
										</div>
									)
								})
							}
						</div>
						
					) :
					(<span className="select-placeholder">Select</span>)
				}
				</div>
				<div className="select-options" style={{display: showDropdown ? 'block' : 'none' }}>
					{
						Object.entries(datas).map(([key,data],i)=>{
							return(

								<div key={i} className="select-option">
									{
										selectedValue && selectedValue.includes(data.id) ? 
											(
												<input name="permissions" onChange={handleChange} id={data.id} value={data.id} className='select-input' type={multiple ? 'checkbox' : 'radio'} checked="checked" />
											)
											:
											(
												<input name="permissions" onChange={handleChange} id={data.id} value={data.id} className='select-input' type={multiple ? 'checkbox' : 'radio'} />
											)
									}
									
									<label onClick={handleClick} htmlFor={data.id}>{data.name}</label>
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