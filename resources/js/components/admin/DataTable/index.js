import React, {useEffect,useState} from 'react'
import Columns from './column'
import Rows from './rows'
const DataTable = (props)=>{
	const {columns,rows,actions,className} =props
	return (
		<>
		 <table  className={`datatable-table ${className ? className : ''}`}>
		 		<Columns columns={columns} />
		 		<Rows rows={rows} columns={columns} />
		 </table>
		</>
	);
}

export default DataTable