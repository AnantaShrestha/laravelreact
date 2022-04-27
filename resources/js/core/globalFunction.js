export function isObject(data){
	return (typeof data === 'object');
}
export function isArray(data){
	return (typeof data === 'array')
}
export function isEmpty(data){
	return (!data || data.length === 0 );
}
