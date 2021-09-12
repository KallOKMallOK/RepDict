import React from 'react';
import { Link, RouteComponentProps, Router } from '@reach/router'

// Components

// App styles
import "../styles/reset.scss"
import '../styles/main.scss';

interface IHomeProps extends RouteComponentProps {
  init?: boolean
  textHello?: string
}


const Home: React.FC<IHomeProps> = props => {
  return (
    <div className="home">
      {/* <Currsection info={{Hello: 20, "dflmdf fdf": "310/31"}} />
      <Card currentWord={3} countWords={10} word="Spring" hint="Весна" /> */}
      <p style={{color: "white"}}>Home, sweet home</p> 
	 </div>
  );
}

export default Home;
