import React,{useState} from 'react'

const Button = (props) =>{
	const {type,className,name,isLoading,isDisable}=props
	return (
		<>
			<button disabled={isDisable} type={props.type} className={props.className}  >
					{
						isLoading ? (<span className="spinner"></span>) : 
						(<span className="btn-span">{props.name}</span>)

					}	
			</button>
		</>
	)
}

export default Button;