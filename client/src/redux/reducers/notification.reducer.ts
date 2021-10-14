import { NOTIFY, EStatusNotification } from "../types"

const initialState = {
	visible: false,
	type: null,
	head: "",
	content: "",
	timeout: 2000
}

export const notification = (state = initialState, action: any) => {
	switch(action.type){
		case NOTIFY.SHOW:
			return{
				visible: true,
				type: action.payload.type,
				head: action.payload.head,
				content: action.payload.content,
				timeout: action.payload.timeout,
			}
		case NOTIFY.HIDE:{
			return{
				...initialState
			}
		}
		default:
			return state
	}
}