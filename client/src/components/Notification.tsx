import React, { useState } from "react"
import Action from "../redux/actions"
import store from "../redux/store"

import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaTimes, FaTimesCircle } from "react-icons/fa"

import "../styles/components/notification.scss"

enum EStatus{
	SUCCESS = "SUCCESS", 
	ERROR = "ERROR", 
	WARNING = "WARNING"
}



interface NotifyProps{
	visible: boolean
	head: string
	content: string
	type: EStatus
	timeout?: number
}

export const Notification = {
	success: (head: string, content: NotifyProps['content'], timeout = 2000) => {
		store.dispatch(Action.notification.show("success", head, content, timeout))
	},
	error: (head: string, content: NotifyProps['content'], timeout = 2000) => {
		store.dispatch(Action.notification.show("error", head, content, timeout))
	},
	warning: (head: string, content: NotifyProps['content'], timeout = 2000) => {
		store.dispatch(Action.notification.show("warning", head, content, timeout))
	}
}

const NotificationContainer: React.FC<NotifyProps> = props => {

	props.visible && setTimeout(() => {
		store.dispatch(Action.notification.hide())
	}, props.timeout || 2000)

	const iconSwitcher = (type: string) => {
		switch(type){
			case "success":
				return <FaCheckCircle />
			case "error":
				return <FaExclamationTriangle />
			case "warning":
				return <FaExclamationCircle />
		}
	}
	return (
		// including BEM methodology
		<div className={`notification notification_${props.type || "default"} notification_${props.visible? "visible": "non-visible"}`}>
			<div className="notification_content">
				<div className="notification_content__close" onClick={() => store.dispatch(Action.notification.hide())}><FaTimes/></div>
				<span className="notification_content__icon">
					{ iconSwitcher(props.type) }
				</span>
				<h2 className="notification_content__head">{props.head}</h2>
				<p className="notification_content__text">{props.content}</p>
			</div>
		</div>
	)
}



export default NotificationContainer