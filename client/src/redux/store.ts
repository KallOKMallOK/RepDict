import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
// import { PayloadAction } from '@reduxjs/toolkit';

// This middleware will just add the property "async dispatch" to all actions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type MiddlewareFunction = (store: Store) => (next: (a: any) => any) => (action: PayloadAction) => any;

// const asyncDispatchMiddleware: MiddlewareFunction = store => next => action => {
// 	let syncActivityFinished = false;
// 	let actionQueue: PayloadAction[] = [];

// 	function flushQueue() {
// 		actionQueue.forEach(a => store.dispatch(a)); // flush queue
// 		actionQueue = [];
// 	}

// 	function asyncDispatch(asyncAction: PayloadAction) {
// 		actionQueue = actionQueue.concat([asyncAction]);

// 		if (syncActivityFinished)
// 			flushQueue();
// 	}

// 	const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch });

// 	const res = next(actionWithAsyncDispatch);

// 	syncActivityFinished = true;
// 	flushQueue();

// 	return res;
// };

const composeEnhancers = composeWithDevTools({ 
	trace: true, 
	traceLimit: 25 
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunkMiddleware)
))


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store