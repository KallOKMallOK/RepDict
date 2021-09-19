import React, { useEffect, useState } from "react"
import Action from "../redux/actions"
import store from "../redux/store"

import { FaTimes } from "react-icons/fa"

enum EStatus{
	SUCCESS = "SUCCESS", 
	ERROR = "ERROR", 
	WARNING = "WARNING"
}



interface NotifyProps{
	visible: boolean,
	head: string,
	content: string,
	type: EStatus,
	timeout?: number
}

export const Notification = {
	success: (head: string, content: string, timeout: number = 2000) => {
		store.dispatch(Action.notification.show("success", head, content, timeout))
	},
	error: (head: string, content: string, timeout: number = 2000) => {
		store.dispatch(Action.notification.show("error", head, content, timeout))
	},
	warning: (head: string, content: string, timeout: number = 2000) => {
		store.dispatch(Action.notification.show("warning", head, content, timeout))
	}
}

const NotificationContainer: React.FC<NotifyProps> = props => {
	const [visible, changeVisible] = useState(props.visible)


	props.visible && setTimeout(() => {
		changeVisible(false)
		store.dispatch(Action.notification.hide())
	}, props.timeout || 2000)

	return (
		<div className={`Notification notify_${props.type || "default"}`} style={{display: props.visible? "block": "none"}}>
			<div className="Notification_wrapper_content">
				<div className="close" onClick={e => store.dispatch(Action.notification.hide())}><FaTimes/></div>
				<h2 className="head">{props.head}</h2>
				<p className="content">{props.content}</p>

			</div>
		</div>
	)
}



export default NotificationContainer