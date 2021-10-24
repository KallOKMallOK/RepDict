import React from 'react';
import API from '../api';

import "../styles/pages/Rating.scss"
interface RatingItem{
	average_rating: number
	login: "optimus"
	name: "Оптимус Прайм Насрал"
	rating: 82020
	walkthroughs: number
}

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
		API.getRating()
			.then(data => {
				this.setState({ 
					rating: data.data.users.map((item: any) => 
						Object.keys(item).reduce((prev, curr) => 
							enableProps.includes(curr) ? {...prev, [curr]: item[curr]} : {...prev}, {}
						)
					)
				})
			})
	}
	render(){
		return(
			<div className="Rating" style={{color: "white"}}>
				<ul className="main_list">
					{
						this.state.rating.map((item, index) => {
							return <li className="main_list_item" key={index}>
								
								<span className="login"><span className="index">{index + 1}</span> {item.login}</span>
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
