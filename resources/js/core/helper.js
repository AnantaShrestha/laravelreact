export default class Helper{
	isObject(data){
		return (typeof data === 'object');
	}
	
	isArray(data){
		return (typeof data === 'array')
	}

	isEmpty(data){
		return (!data || data.length === 0 );
	}


}