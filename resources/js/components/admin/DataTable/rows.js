const Rows = (props) => {
	const { columns, rows,perPage, currentPage } = props
	return (
		<>
			<tbody>
				{
					rows && Object.entries(rows)?.map(([rowIndex, row], i) => {
						return (
							<tr key={i}>
								<td>{perPage ? (currentPage * perPage) - (perPage - ((i + 2) - 1)) : i + 1}</td>
								{
									Object.entries(columns)?.map(([columnIndex, column], j) => {
										return (
											<td key={j}>{column.render(row)}</td>
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