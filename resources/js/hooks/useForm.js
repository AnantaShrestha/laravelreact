import React, {useState} from 'react'
import {omit} from 'lodash'
const useForm = (callback,validation) =>{
	//values
	const [values, setValues] = useState({});
    //Errors
    const [errors,setErrors] = useState({})
    //form button loading and disable
    const [isLoading,setLoading]=useState(false)
	const [isDisable,setDisable]=useState(false)
    //input change handler
    const handleChange = (event) =>{
        event.persist();
        let name = event.target.name;
        let val = event.target.value;
        setValues({
            ...values,
            [name]:val,
        })
        validate(name,val)
    }
    //validate form
    const joinObject = (key)=>{
       if(key)  Object.assign(errors,{[key]:key+' field is required'})
    }
    const validate = (name,val) =>{
        Object.entries(validation).map(([key,attr],i)=>{
            if(attr.required && (values[key]==undefined || values[key] == '')){
                joinObject(key)
            }
        })
        if(val && name){
            delete errors[name];
        }else{
            joinObject(name)
        }
    }
   
    //handle submit
    const handleSubmit =  (event) => {
    	if(event) event.preventDefault();
    	setLoading(true)
    	setDisable(true)
    	setTimeout(function(){
            validate()
    		setLoading(false)
    		setDisable(false)
           	return callback();
    	},2000)
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