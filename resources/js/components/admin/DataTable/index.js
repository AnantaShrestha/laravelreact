import React, {useEffect,useState} from 'react'
import Columns from './column'
import Rows from './rows'
import Search from './search'
import Pagination from './pagination'
const DataTable = (props)=>{
	const {columns,rows,className,handleSubmit,handleChange,isLoading,isDisable,handlePagination,pagination} =props
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
		 			{
						!isLoading && (
							<Rows rows={rows.data ? rows.data : rows} 
							columns={columns}
							isLoading={isLoading}
							currentPage={rows.current_page}
							perPage={rows.per_page} />
						)
					}
		 		</table>
				{
					(!rows || !rows.data) && (
						<div className="not-data-found">
							<h1>Data Not Found</h1>
						</div>
					)
				}
				
				{
					isLoading && (
						<div className="loader-wrapper">
							<div className="table-loader"></div>
						</div>
					)
				}
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