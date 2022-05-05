import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import DataTable from '@/components/admin/DataTable'
import Tooltip from '@/components/admin/Tooltip'
import useForm from '@/hooks/useForm'
import {LogListAction} from '@/services/redux/log/LogAction'
import {dateFormat} from '@/core/globalFunction'
const LogList = () =>{
	const dispatch=useDispatch()
	const logsList= useSelector((state)=>state.log.logs)
	const searchForm = ()=> {
		setData({...data,'search':values.search})
	}
	const handlePagination = (page) =>{
		setData({...data,'page':page})
	}
	const {isLoading,isDisable,values,handleChange,handleSubmit} = useForm(searchForm);
	const [data,setData]=useState({
		length:10,
		page:1,
		search:values.search ?? ''
	})
	useEffect(()=>{   
		dispatch(LogListAction(data))
	},[data])
	const columns =[
		{
			key:'username',title:'Username',
			render:(row)=>{
				return(
					<span>{row.username}</span>
				)
			}
		},
		{
			key:'path',title:'Path',
			render:(row)=>{
				return(
					<span>{row.path}</span>
				)
			}
		},
		{
			key:'method',title:'Method',
			render:(row)=>{
				return(
					<span>{row.method}</span>
				)
			}
		},
		{
			key:'message',title:'Message',
			render:(row)=>{
				return(
					<>
						<Tooltip key={row.id} index={row.id} title={row.message.slice(0,row.message.length)}>
							<span className={row.status == 0 ? 'error-log' : 'success-log'}>{row.message.slice(0,50)}</span>
						</Tooltip>
					</>
				)
			}
		},
		{
			key:'created_at',title:'Created At',
			render:(row) =>{
				return(
					<>
					   <span>{dateFormat(row.created_at)}</span>
					</>
				)
			}
		}

	]
	return(
		<>
		<div className="content-body">
			<div className="page-heading-wrapper">
				<div className="page-title-wrapper">
					<h1>Log</h1>
				</div>
			</div>
			<div className="content-box-wrapper">
				<div className="table-wrapper">
						<DataTable columns={columns}
							   rows={logsList} 
							   handleSubmit={handleSubmit} 
							   handleChange={handleChange} 
							   isLoading={isLoading} 
							   isDisable={isDisable}
							   handlePagination={handlePagination} />
				</div>
			</div>
		</div>
		</>
	)
}

export default LogList