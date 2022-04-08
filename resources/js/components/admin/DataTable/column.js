const Columns = (props) =>{
	 const {columns} =props
	return (
		<>
			<thead>
				<tr>
					<th>S.No</th>
					{
						columns?.map((column,index)=>{
							return(
								<th key={index}>{column.title}</th>
							)
						})
					}
				</tr>
			</thead>
		</>
	);
}
export default Columns