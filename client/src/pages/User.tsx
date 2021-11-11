import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { FaStar, FaListOl } from "react-icons/fa"
import ScrollContainer from 'react-indiana-drag-scroll'
import API from "../api";
import { Deck } from "../components/Deck";
import { User } from "../domains/entities/user.entity"

import "../styles/pages/User.scss"
import { hideLoader, showLoader } from "../components";

interface ParamsUserPage{
	login: string
}


const UserPage: React.FC = () => {
	const { login } = useParams<ParamsUserPage>();

	const [user, setUser] = useState({} as User)
	const [loader, setLoader] = useState(false)

	!loader && showLoader()
	useEffect(() => {
		API.getUser(login, 1)
			.then(data => {
				setUser(data)
				if(!loader){
					hideLoader()
					setLoader(true)
				}
			})
			.then(data => console.log(user))
	}, [login, loader])


	return (
		<div className="UserPage">
			<div className="top_panel">


				<div className="top_panel_left">
					<div className="avatar">
						<img src="https://avatars.githubusercontent.com/u/73424545?v=4" alt="avatar"/>
					</div>
					<div className="info">
						<h2 className="info_name">{user.name || "USERNAME"}</h2>
						<span className="info_login">@{user.login || "NOLOGIN"}</span>
					</div>
				</div>

				<div className="top_panel_right">
					<div className="info_rating">
						<span className="info_rating_icon"><FaStar/></span>
						<span className="info_rating_count">{user.rating || 10000}</span>
					</div>
					<div className="info_position">
						<span className="info_position_cnt"><Link to="/rating" className="position_mark">#{1}</Link> in Rating!</span>
					</div>

				</div>
			</div>

			<section className="owners_deck">
				<h2 className="head_section_owners_deck">Last Decks</h2>
				<ScrollContainer hideScrollbars={false} className="cards">
				{
					user.decks?.length !== 0 && user.decks?.map((deck, index: number) => {
						return <Deck
							index={index}
							id={deck.id}
							name={deck.name}
							countWords={deck.countWords || 0} 
							author={deck.author}
							owner={deck.owner}
							description={deck.description}
							countRepetitions={deck.countRepetitions || 0} 
							isPrivate={deck.isPrivate} 
							mainLang={deck.mainLang.toUpperCase()} 
							secondLang={deck.secondLang.toUpperCase()}
							countLikes={deck.countLikes || 0}
							activeLike={deck.activeLike || false}
							cards={deck.cards}
							key={`deck_${index}`}

							// enables
							enableMethods={{ 
								enableChangePrivate: false, 
								enableDelete: false, 
								enableEdit: false,
								enableLike: true
							}}

							like={() => API.setLike(deck.id)}
						/>
					})
				}
			</ScrollContainer>
			</section>
		</div>
	)
}

export default UserPage