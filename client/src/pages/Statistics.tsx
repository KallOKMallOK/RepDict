import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'



// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StatisticsProps extends RouteComponentProps {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StatisticsState{
}

class Statistics extends React.Component<StatisticsProps>{
	constructor(props: StatisticsProps){
		super(props)
	}

	render(){
		return(
			<div className="page_statistics">
				Statistics
			</div>
		)
	}
}


export default Statistics;
