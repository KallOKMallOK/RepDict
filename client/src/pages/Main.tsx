import React from 'react';

import { showLoader, hideLoader } from "../components"

import "../styles/pages/Main.scss"

interface IMainProps{
}

class Main extends React.Component{
	constructor(props: IMainProps){
		super(props)
		showLoader()
	}

	componentDidMount(){
		hideLoader()
	}

	render(){
		return(
			<div className="Main" style={{color: "white"}}>
				<div className="slider">
					<div className="image_wrapper">
						<img className="image_slider" src="images/slider.png" alt="slider image" />

					</div>
					<div className="text_block">
						<h1>Learn, Repeate and Develop</h1>
						<p>Welcome to the service for memorizing words in foreign languages using flashcards</p>
						{/* <h2>Our advantages:</h2>
						<ul className="advantages">
							<li className="advantages_item">Simple</li>
							<li className="advantages_item">Concise</li>
							<li className="advantages_item">Fast</li>
							<li className="advantages_item">Creative</li>
						</ul> */}
					</div>
				</div>
			</div>
		)
	}
}


export default Main;
