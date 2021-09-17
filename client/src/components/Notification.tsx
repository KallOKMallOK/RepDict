import React, { useEffect, useState } from "react"
import Action from "../redux/actions"
import store from "../redux/store"
import { connect, ConnectedProps } from "react-redux"

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
		store.dispatch(Action.notification.show("SUCCESS", head, content, timeout))
	},
	error: (head: string, content: string, timeout: number = 2000) => {
		store.dispatch(Action.notification.show("ERROR", head, content, timeout))
	},
	warning: (head: string, content: string, timeout: number = 2000) => {
		store.dispatch(Action.notification.show("WARNING", head, content, timeout))
	}
}

const NotificationContainer: React.FC<NotifyProps> = props => {
	const [visible, changeVisible] = useState(props.visible)

	props.visible && setTimeout(() => {
		changeVisible(false)
		store.dispatch(Action.notification.hide())
	}, props.timeout? props.timeout: 2000)

	return (
		<div className={`Notification notify_${props.type}`} style={{display: visible? "block": "none"}}>
			<h2>{props.head}</h2>
			<p>{props.content}</p>
		</div>
	)
}



export default NotificationContainer