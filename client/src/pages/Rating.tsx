import React from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import { hideLoader, showLoader } from '../components';

import "../styles/pages/Rating.scss"
interface RatingItem{
	average_rating: number
	login: string
	name: string
	rating: number
	walkthroughs: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRatingProps{
}

interface RatingState{
	rating: RatingItem[]
}

class Rating extends React.Component<IRatingProps, RatingState>{
	constructor(props: IRatingProps){
		super(props)

		this.state = {
			rating: []
		}
	}

	componentDidMount(){
		const enableProps = ["login", "rating"]
		showLoader()
		API.getRating()
			.then(data => {
				this.setState({ 
					rating: data.data.users.map((item: any) => 
						Object.keys(item).reduce((prev, curr) => 
							enableProps.includes(curr) ? {...prev, [curr]: item[curr]} : {...prev}, {}
						)
					)
				}, () => hideLoader())
			})
	}
	render(){
		return(
			<div className="Rating" style={{color: "white"}}>
				<h1>Rating</h1>
				<ul className="header">
					<li><span className="header_login">Login</span></li>
					<li><span className="header_scores">Scores</span></li>
				</ul>
				<ul className="main_list">
					{
						this.state.rating.map((item, index) => {
							return <li className="main_list_item" key={index}>
								
								<span className="login"><span className="index">{index + 1}</span> <Link to={`/users/${item.login}`}>{item.login}</Link></span>
								<span className="rating">{item.rating}</span>
							</li>
						})
					}
				</ul>
			</div>
		)
	}
}


export default Rating;
