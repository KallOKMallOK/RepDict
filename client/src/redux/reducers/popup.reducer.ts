import { POPUP } from "../types"

const initialState = {
	visible: false,
	type: 0,
	head: "",
	content: "",

	// Actions
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	close: () => {}
}

export const popup = (
	state = initialState, 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	action: any) => {
	switch(action.type){
		case POPUP.SHOW:
			return{
				type: action.payload.type,
				visible: true,
				head: action.payload.head,
				content: action.payload.content,
				close: action.payload.actions.close,
				success: action.payload.actions.success
			}
		case POPUP.HIDE:{
			return{
				...initialState
			}
		}
		// case POPUP.SUCCESS: {
		// 	return {

		// 	}
		// }
		default:
			return state
	}
}