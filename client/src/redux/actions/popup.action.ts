import { POPUP, POPUP_TYPES } from "../types" 

interface ActionsMethodPopup{
	close: () => void
	success?: (suc: boolean) => void
}

export const show = (type: POPUP_TYPES, head: string, content: string, actions: ActionsMethodPopup) => ({
	type: POPUP.SHOW,
	payload: {
		type,
		head,
		content,
		actions
	}
})

export const hide = () => ({
	type: POPUP.HIDE
})

export const success = (acepted: boolean) => ({
	type: POPUP.SUCCESS,
	payload: acepted
})