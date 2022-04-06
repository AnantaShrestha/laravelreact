import React from 'react';
import { ToastContainer,toast} from 'react-toastify';


const useNotification=(obj) => {
	switch(obj.type){
		case 'warning':
			return toast.warning(obj.message)
		case 'info':
			return toast.info(obj.message)
		case 'danger':
			return toast.danger(obj.message)
		default:
			return toast.success(obj.message)
	}
}

export default useNotification;