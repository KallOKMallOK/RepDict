import React, { useState } from "react"

import "../styles/components/loader.scss"

interface LoaderProps{
	visible: boolean
	size: string
}

const LoaderContainer: React.FC<LoaderProps> = props => {
	// const [visible, setVisible] = useState(props.visible)

	return(
		<div className={!props.visible ? "local_loader--hide": "local_loader"}>
			<div data-size={props.size} className="local_loader__circle"></div>
		</div>
	)
}

export default LoaderContainer