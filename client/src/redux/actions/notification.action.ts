import { NOTIFY, EStatusNotification } from "../types" 

export const show = (type: any, head: string, content: string, timeout = 300) => ({
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