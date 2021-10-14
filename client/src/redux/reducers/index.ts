import { combineReducers } from 'redux'
import { app } from "./app.reducer"
import { notification } from "./notification.reducer"
import { popup } from "./popup.reducer"


const rootReducer = combineReducers({
	app,
	notification,
	popup
})
 
export default rootReducer