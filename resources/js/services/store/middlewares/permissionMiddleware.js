const permissionMiddleware= (store) => (next) => (action)=>{
	let state=store.getState()
	console.log(state)
	next(action)

}

export default permissionMiddleware


// const location=useLocation()
// 	const navigate=useNavigate()
// 	const dispatch=useDispatch()
// 	const hostName=window.location.hostname
// 	const [viewPermissions,setViewPermissions]=useState([])
// 	const isAuthenticate =useSelector(
// 		(state) => state.auth.isLoggedIn
// 	);
// 	if(isAuthenticate){
// 		const userPermission =useSelector(
// 			(state) => state.user.userPermission
// 		)
// 		useEffect(()=>{
// 			dispatch(UserPermissionAction())
// 		},[])
// 		useEffect(()=>{
// 			setViewPermissions([])
// 			userPermission && userPermission?.map((permission,key)=>{
// 				let path =permission.replace(hostName+'/api','')
// 				setViewPermissions(viewPermissions=>[...viewPermissions,path])
// 			})
// 		},[userPermission])
		

// 	}