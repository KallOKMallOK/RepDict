import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'



interface StatisticsProps extends RouteComponentProps {

}

interface StatisticsState{
  
}

class Statistics extends React.Component<StatisticsProps>{
  constructor(props: StatisticsProps){
    super(props)
  }

  componentDidMount(){

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
