import React from 'react';

interface IRatingProps{
}

class Rating extends React.Component{
	constructor(props: IRatingProps){
		super(props)
	}

	render(){
		return(
			<div className="Rating" style={{color: "white"}}>
				Rating!!!
			</div>
		)
	}
}


export default Rating;
