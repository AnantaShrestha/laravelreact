import React, {useState} from 'react'
import {omit} from 'lodash'
const useForm = (callback) =>{
	//values
	const [values, setValues] = useState({});
    //Errors
    const [errors, setErrors] = useState({});
    const [isLoading,setLoading]=useState(false)
	const [isDisable,setDisable]=useState(false)
	//validate
    // const validate=(event)=>{
    // 	let rules=event.target.getAttribute('rules')
    // 	let name=event.target.name
    // 	let value=event.target.value
    // 	console.log(rules,name,value)
    // }
	//hanble change
    const handleChange = (event) =>{
        event.persist();
        let name = event.target.name;
        let val = event.target.value;
        setValues({
            ...values,
            [name]:val,
        })
    }
   
    //handle submit
    const handleSubmit =  (event) => {
    	if(event) event.preventDefault();
    	setLoading(true)
    	setDisable(true)
    	setTimeout(function(){
    		setLoading(false)
    		setDisable(false)
    		
    		if(Object.keys(errors).length === 0 && Object.keys(values).length !==0 ){
           		callback();
        	}
    	},2500)
    }
    return {
        values,
        errors,
        isLoading,
        isDisable,
        handleChange,
        handleSubmit
    }
}

export default useForm