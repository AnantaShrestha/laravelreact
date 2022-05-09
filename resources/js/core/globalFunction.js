//check object or not
export function isObject(data){
	return (typeof data === 'object');
}
// check array or not
export function isArray(data){
	return (typeof data === 'array')
}
// check empty or not
export function isEmpty(data){
	return (!data || data.length === 0 );
}
//date format
export function dateFormat(data){
	let date=new Date(data)
	return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
}

// get short name
export function shortName(data){
	let nameArr=data.split(' ');
	let shortName=nameArr. shift().charAt(0) + nameArr.pop().charAt(0)
	return shortName.toUpperCase()
}

//get current user
export function currentUser(){
	let user=localStorage.getItem('token')
	return user ? JSON.parse(user).user : ''
}
