import React, {useState} from 'react'
import { capitalFirstLetter } from 'lodash';
const useForm = (callback,validation) =>{
	//values
	const [values, setValues] = useState({});
    //Errors
    const [errors,setErrors] = useState({})
    //form button loading and disable
    const [isLoading,setLoading]=useState(false)
	const [isDisable,setDisable]=useState(false)
    const findInputType = (event) =>{
        let name=event.target.name
        let val=event.target.value
        switch(event.target.type){
            case 'checkbox':
                if(!values[name]){
                    setValues({...values,[name]:[val]})
                    event.target.setAttribute('checked','checked')
                }
                else{
                    if(values.hasOwnProperty(name) && event.target.checked){
                        values[name] = [].concat(values[name],val); 
                        event.target.setAttribute('checked','checked')
                    }
                    else{
                        let index=values[name].indexOf(val)
                        if (index > -1) {
                            values[name].splice(index, 1);
                            event.target.removeAttribute('checked')

                        }
                    }
                }
                break;
            default:
                setValues({...values,[name]:val})
                break;

        }
    } 
    //input change handler
    const handleChange = (event) =>{
        event.persist();
        findInputType(event)
        validate(event.target.name,event.target.value)
    }
    //validate form
    const joinErrorObject = (key,type)=>{
       if(key && type == 'required')  Object.assign(errors,{[key]:key.replace('_',' ').toUpperCase()+' field is required'})
       if(key && type=='email') Object.assign(errors,{[key]:key.replace('_',' ').toUpperCase() +' is not valid'})
       if(key && type=='confirm') Object.assign(errors,{[key]:key.replace('_',' ').toUpperCase() +' did not match'})
    }
    const validate = (name,val) =>{
        validation && Object.entries(validation).map(([key,attr],i)=>{
            if(attr.required && (values[key]==undefined || values[key] == '')){
                joinErrorObject(key,'required')
            }
            if(attr.rules && values[key]!=''){
                let rules=attr.rules.split('|')
                rules && rules?.map((rule,key)=>{
                //    if(rule == 'email' && !values[key].match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                //     joinErrorObject(key,rule)
                //    }
                   if(rule=='confirm' && values[key] === values['password_confirmation']){
                    joinErrorObject(key,rule)
                   }
                })
            }
        })
        if(val && name){
            delete errors[name];
        }else{
            joinErrorObject(name)
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
           	if(callback())
                callback()
    	},2000)
    }
    return {
        values,
        setValues,
        errors,
        isLoading,
        isDisable,
        handleChange,
        handleSubmit,
    }
}

export default useForm