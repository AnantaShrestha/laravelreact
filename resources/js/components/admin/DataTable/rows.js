const Rows = (props) =>{
	const {columns,rows} =props
	return(
		<>
			<tbody>
				{
					Object.entries(rows)?.map(([rowIndex,row],i)=>{
						return (
							<tr key={i}>
								<td>{i + 1}</td>
								{
									Object.entries(columns)?.map(([columnIndex,column],j)=>{	
										return(
											<td key={j}>{row[column.key]}</td>
										)
									})

								}
							</tr>
						)
					})
				}
			</tbody>
		</>
	)
}
export default Rows