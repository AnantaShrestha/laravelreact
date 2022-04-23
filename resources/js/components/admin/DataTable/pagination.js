import React,{useState,useEffect} from 'react'
const Pagination = (props)=>{
	const {totalPage,currentPage,handlePagination}=props
	const [range,setRange]=useState([])
	useEffect(()=>{
		setRange([])
		for(let i=1;i<=totalPage;i++){
			setRange(range=>[...range,i])
		}
	},[currentPage,totalPage])
	return(
		<>
			<ul className="pagination-ul">
				{
					range?.map((i)=>{
						return(
							<li key={i}>
								{
									i!=currentPage ? (
										<button className="pagination-btn" onClick={()=>handlePagination(i)}>{i}</button>
									) :
									(<button className="active pagination-btn">{i}</button>)
								}
							</li>
						);
					})
				}
			</ul>
		</>
	)
}
export default Pagination