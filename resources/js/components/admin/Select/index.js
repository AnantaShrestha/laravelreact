import React,{useState,useEffect,useRef} from 'react'
import CheckBox from '@/components/admin/checkBox'

const Select = (props) =>{
	const {multiple,datas,className,handleChange,selectedValues,name,optionValue,optionKey}=props
	const node=useRef();
	const [showDropdown,setDropDown] = useState(false)
	const [checkedValues,setCheckedValue]=useState([])
	const [data,setData]=useState([])
	const [items,setItems] = useState([])
	useEffect(()=>{
		setData(datas)
	},[datas])
	useEffect(()=>{
		setItems([])
		data.length > 0 && Object.entries(data).map(([key,item],i)=>{
			setItems(
				items=>[
					...items,
					[item[optionKey] , item[optionValue]]
				]
			)

		})
	},[data])
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
	const selectFilter = (e) =>{
		setData(
			datas.filter(item=>{
				return item[optionValue].toLowerCase().search(
     				event.target.value.toLowerCase()) !== -1;
     		})
		)
	}
	return(
		<>
			<div className="select-wrapper">
				<div className="selected-items" onClick={()=>setDropDown(!showDropdown)}>
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
					<div className="select-search-wrapper">
						<input name='search' className="select-search" onChange={selectFilter} autoComplete="off" />
					</div>
					<div className="select-items" >
						{
							items.length > 0 && items?.map(item=>{
								return(
									<div key={item[0]} className="select-option">
										<CheckBox name={name} handleChange={handleChange} value={item[0]} className='select-input' multiple={multiple} selectedValues={selectedValues} />
										<label onClick={handleClick} htmlFor={item[0]}>{item[1]}</label>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default Select