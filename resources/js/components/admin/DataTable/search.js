import { FaSearch} from 'react-icons/fa';

const Search = (props) =>{
	const {handleSubmit,handleChange} =props

	return(
		<div className="datatable-search-wrapper">
			<form onSubmit={handleSubmit} >
				<div className="datatable-search-form-wrapper">
					<input  name='search' type="text" placeholder="Search" onChange={handleChange} />
					<button className="search-btn"><FaSearch/></button>
				</div>
			</form>
		</div>
	)
}

export default Search