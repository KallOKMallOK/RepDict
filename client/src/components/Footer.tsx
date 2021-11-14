import React from "react"

const Footer: React.FC = () => {
	return(
		<footer>
			<div className="wrap_content">
				<div className="front">Front: <a href="https://t.me/daniil00q">Shenyagin Daniil</a><a href="https://github.com/daniil00t">@danii00t</a></div>
				<div className="center">RepDict&copy;{new Date().getFullYear()}</div>
				<div className="back">Back: <a href="https://t.me/nafanyechka">Bausov Vadim</a><a href="https://github.com/nafanyushka">@nafanyechka</a></div>
			</div>
		</footer>
	)
}

export default Footer