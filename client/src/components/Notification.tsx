import React from "react"

enum EStatus{
	OK = "OK", 
	ERROR = "ERROR", 
	WARNING = "WARNING"
}

interface NotifyProps{
	head: string,
	content: string,
	type: EStatus
}


const NotificationContainer: React.FC<NotifyProps> = props => {
	return (
		<div className={`Notification notify_${props.type}`}>
			<h2>{props.head}</h2>
			<p>{props.content}</p>
		</div>
	)
}

export default NotificationContainer