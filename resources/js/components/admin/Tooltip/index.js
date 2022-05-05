import React,{useState} from 'react'

const Tooltip = (props)=>{
	const {children,title} =props
	const [isHover,setHover]=useState(false)
	console.log(isHover)
	return (
		<>
		  <div className="tooltip-wrapper" 
		  	onMouseEnter={()=>{setHover(true)}}
		  	onMouseLeave={()=>{setHover(false)}}

		  >
		  		<div className="tooltip-text">{children}</div>
		  		{
		  			isHover && (
			  			<div className="tooltip-hover">
			  				{title}
			  			</div>
		  			)
		  		}
		  </div>
		</>
	)
}

export default Tooltip