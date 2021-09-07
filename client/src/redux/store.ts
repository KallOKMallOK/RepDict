import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

// This middleware will just add the property "async dispatch" to all actions
type MiddlewareFunction = (store: any) => (next: any) => (action: any) => any;

const asyncDispatchMiddleware: MiddlewareFunction = store => next => action => {
	let syncActivityFinished = false;
	let actionQueue: any[] = [];

	function flushQueue() {
		actionQueue.forEach(a => store.dispatch(a)); // flush queue
		actionQueue = [];
	}

	function asyncDispatch(asyncAction: Object) {
		actionQueue = actionQueue.concat([asyncAction]);

		if (syncActivityFinished)
			flushQueue();
	}

	const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch });

	const res = next(actionWithAsyncDispatch);

	syncActivityFinished = true;
	flushQueue();

	return res;
};

const composeEnhancers = composeWithDevTools({ 
	trace: true, 
	traceLimit: 25 
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunkMiddleware, asyncDispatchMiddleware)
))


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store