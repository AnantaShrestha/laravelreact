import {applyMiddleware,compose,createStore} from 'redux'
import thunk from 'redux-thunk'
import RootReducers from './reducers'
import permissionMiddleware from './middlewares/permissionMiddleware'
const composeEnhancers=window.__REDUX__DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store =createStore(
	RootReducers,
	composeEnhancers(applyMiddleware(thunk,permissionMiddleware))
);

export default Store;