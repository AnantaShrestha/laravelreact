import React, {useEffect,useState} from 'react'
import Columns from './column'
import Rows from './rows'
import Search from './search'
import Pagination from './pagination'
const DataTable = (props)=>{
	const {columns,rows,actions,className,handleSubmit,handleChange,isLoading,isDisable,handlePagination,pagination} =props
	return (
		<>
			<div className="datatable-wrapper">
				<div className="datatable-action-header-wrapper">
					<Search handleSubmit={handleSubmit}
							handleChange={handleChange} 
							isLoading={isLoading} 
							isDisable={isDisable} />
				</div>
				<table  className={`datatable-table ${className ? className : ''}`}>
		 			<Columns columns={columns} />
		 			<Rows rows={rows.data ? rows.data :rows} 
		 				  columns={columns}
		 				  isLoading={isLoading}
		 				  currentPage={rows.current_page}
		 				  perPage={rows.per_page} />
		 		</table>
		 		{
		 			rows.data && rows.last_page > 1  && (
			 			<div className="pagination-wrapper">
				 			<Pagination totalPage={rows.last_page} 
				 						currentPage={rows.current_page} 
				 						handlePagination={handlePagination}
				 						 />
			 			</div>
		 			)
		 		}
			</div>
		</>
	);
}

export default DataTable