import React from 'react'
const PublicLayout = ({children}) =>{
	return (
		<div className="body-wrapper">
			<>
				{children}
			</>
		</div>
	);
}
export default PublicLayout