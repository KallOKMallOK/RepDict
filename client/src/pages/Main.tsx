import React, { ReactNode } from 'react';
import { withTranslation } from 'react-i18next'

import { showLoader, hideLoader } from "../components"

import "../styles/pages/Main.scss"

interface IMainProps{
	t: (s: string) => ReactNode
}

class Main extends React.Component<IMainProps>{
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
						<h1>{this.props.t("Pages.Main.welcome")}</h1>
						<p>{this.props.t("Pages.Main.description")}</p>
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


export default withTranslation()(Main)