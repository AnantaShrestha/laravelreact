import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import EndPoints from './routes'
import Store from './services/store'
ReactDOM.render(
	<Provider store={Store}>
		<EndPoints />
	</Provider>
	, 
document.getElementById("app"));