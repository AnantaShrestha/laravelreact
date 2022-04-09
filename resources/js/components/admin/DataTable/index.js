import React, {useEffect,useState} from 'react'
import Columns from './column'
import Rows from './rows'
import Search from './search'

const DataTable = (props)=>{
	const {columns,rows,actions,className} =props
	return (
		<>
			<div className="datatable-wrapper">
				<div className="datatable-action-header-wrapper">
					<Search />
				</div>
				<table  className={`datatable-table ${className ? className : ''}`}>
		 			<Columns columns={columns} />
		 			<Rows rows={rows} columns={columns} />
		 		</table>
			</div>
		</>
	);
}

export default DataTable