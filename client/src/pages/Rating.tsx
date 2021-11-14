import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../api';
import { hideLoader, showLoader } from '../components';
import { User } from '../domains/entities/user.entity';

import "../styles/pages/Rating.scss"
interface RatingItem{
	average_rating: number
	login: string
	name: string
	rating: number
	walkthroughs: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRatingProps extends WithTranslation{
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
				console.log(data);
				this.setState({ 
					rating: data.data.users.map((item: Record<string, string | number | boolean> & User) => 
						Object.keys(item).reduce((prev, curr) => 
							enableProps.includes(curr) ? {...prev, [curr]: item[curr]} : {...prev}, {}
						)
					)
				}, () => hideLoader())
			})
			.catch(err => console.log("err"))
	}
	render(){
		return(
			<div className="Rating" style={{color: "white"}}>
				<h1>{this.props.t("Pages.Rating.Rating")}</h1>
				<ul className="header">
					<li><span className="header_login">{this.props.t("Pages.Rating.login")}</span></li>
					<li><span className="header_scores">{this.props.t("Pages.Rating.scores")}</span></li>
				</ul>
				<ul className="main_list">
					{
						this.state.rating.map((item, index) => {
							return <li className="main_list_item" key={index}>
								<span className="login">
									<span className="index">{index + 1}. </span>
										<Link to={`/user/${item.login}`}>
											{ index === 0 && <span>🥇</span> }
											{ index === 1 && <span>🥈</span> }
											{ index === 2 && <span>🥉</span> }
											{item.login}
										</Link>
									</span>
								<span className="rating">{item.rating}</span>
							</li>
						})
					}
				</ul>
			</div>
		)
	}
}


export default withTranslation()(Rating);
