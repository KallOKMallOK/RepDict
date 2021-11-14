import { NOTIFY } from "../types" 

export const show = (type: string, head: string, content: string, timeout = 300) => ({
	type: NOTIFY.SHOW,
	payload: {
		type,
		head,
		content,
		timeout
	}
})

export const hide = () => ({
	type: NOTIFY.HIDE
})