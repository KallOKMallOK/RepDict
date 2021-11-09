import React from 'react';

// Components

// App styles
import "../styles/reset.scss"
import '../styles/main.scss';

interface HomeProps{
	sayHello?: string 
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: React.FC<HomeProps> = (props: HomeProps) => {
	return (
		<div className="home">
			{/* <Currsection info={{Hello: 20, "dflmdf fdf": "310/31"}} />
			<Card currentWord={3} countWords={10} word="Spring" hint="Весна" /> */}
			<p style={{color: "white"}}>Home, sweet home</p> 
		</div>
	);
}

export default Home;
