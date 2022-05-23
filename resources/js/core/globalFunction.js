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
	let firstLetter='';
	let secondLetter='';
	if(nameArr[0]){
		firstLetter=nameArr.shift().charAt(0)
	}
	if(nameArr[1]){
		secondLetter= nameArr.pop().charAt(0)
	}
	let shortName=firstLetter + secondLetter
	return shortName.toUpperCase()
	
}

