import React from "react"
import { Link } from "react-router-dom"


const Footer: React.FC = props => {
	return(
		<footer>
			<div className="wrap_content">
				<div className="front">Front: <a href="https://t.me/daniil00q" target="_blank">Shenyagin Daniil</a><a target="_blank" href="https://github.com/daniil00t">@danii00t</a></div>
				<div className="center">RepDict&copy;{new Date().getFullYear()}</div>
				<div className="back">Back: <a href="https://t.me/nafanyechka" target="_blank">Bausov Vadim</a><a target="_blank" href="https://github.com/nafanyushka">@nafanyechka</a></div>
			</div>
		</footer>
	)
}

export default Footer