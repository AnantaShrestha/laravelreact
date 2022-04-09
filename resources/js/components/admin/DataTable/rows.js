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
											Helper.isObject(row[column.key]) ? 
												(
													<td key={j}>{row[column.key].join(',')}</td>
												) 
											: 

												(
													<td key={j}>{column.key=='action' ? column.action(row.id) : row[column.key]}</td>

												)
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