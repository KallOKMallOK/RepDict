import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'



interface IStatisticsProps extends RouteComponentProps {
  init?: boolean
  textHello?: string
}


const Statistics: React.FC<IStatisticsProps> = props => {
  return (
    <div className="page_statistics">
		Statistics
	 </div>
  );
}

export default Statistics;
