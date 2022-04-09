const Search = (props) =>{
	const {search} =props

	return(
		<div className="datatable-search-wrapper">
			<input  name='search' type="text" placeholder="Search" />
		</div>
	)
}

export default Search