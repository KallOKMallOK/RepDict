import React from 'react';

interface IPlayProps{
}

class Play extends React.Component{
	constructor(props: IPlayProps){
		super(props)
	}

	render(){
		return(
			<div className="Play" style={{color: "white"}}>
				Play!!!
			</div>
		)
	}
}


export default Play;
