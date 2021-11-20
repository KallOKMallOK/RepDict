import { PayloadAction } from "@reduxjs/toolkit"
import { NOTIFY } from "../types"

const initialState = {
	visible: false,
	type: "",
	head: "",
	content: "",
	timeout: 2000
}

export const notification = (
	state = initialState, 
	action: PayloadAction<{type: string, head: string, content: string, timeout?: number} & number>) => {
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