import {applyMiddleware,compose,createStore} from 'redux'
import thunk from 'redux-thunk'
import RootReducers from './reducers'


const composeEnhancers=window.__REDUX__DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store =createStore(
	RootReducers,
	composeEnhancers(applyMiddleware(thunk))
);

export default Store;