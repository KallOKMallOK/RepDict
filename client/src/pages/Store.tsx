import React from 'react';

interface IStoreProps{
}

class Store extends React.Component{
	constructor(props: IStoreProps){
		super(props)
	}

	render(){
		return(
			<div className="Store" style={{color: "white"}}>
				Store!!!
			</div>
		)
	}
}


export default Store;
