import React, {useState} from 'react'
import { capitalFirstLetter } from 'lodash';
const useForm = (callback) =>{
	//values
	const [values, setValues] = useState({});
    //Errors
    const [errors,setErrors] = useState({})
    //validation
    const [validation,setValidation]=useState({})
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
        if(!values[key] && type == 'required')
            Object.assign(errors,{[key]:key.replace('_',' ').toUpperCase()+' field is required'})
        if(values[key] && (type=='confirm' && values['password_confirmation'] != values['password']))
            Object.assign(errors,{[key]:key.replace('_',' ').toUpperCase() +' did not match with password'})
        if(values[key] && (type=='email' && !values[key].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)))
            Object.assign(errors,{[key]:key.replace('_',' ').toUpperCase() +' is not valid'})

    }
    const rules = (key,rulesData) =>{
        let rules=rulesData.split('|')
            rules && rules?.map((rule,index)=>{
                joinErrorObject(key,rule)
            })
    }
    const validate = (name,val) =>{
        if(name && val){
            delete errors[name];
        }
        else{
            validation && Object.entries(validation).map(([key,attr],i)=>{
                rules(key,attr.rules)
            })
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
        setValidation,
        errors,
        isLoading,
        isDisable,
        handleChange,
        handleSubmit,
    }
}

export default useForm