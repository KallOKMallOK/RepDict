import { combineReducers } from 'redux'
import { app } from "./app.reducer"
import { notification } from "./notification.reducer"


const rootReducer = combineReducers({
	app,
	notification
})
 
export default rootReducer