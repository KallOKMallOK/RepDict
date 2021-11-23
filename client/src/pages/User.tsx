import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom";
import { FaImages, FaStar } from "react-icons/fa"
import ScrollContainer from 'react-indiana-drag-scroll'
import API from "../api";
import { Deck } from "../components/Deck";
import { User } from "../domains/entities/user.entity"
import * as CONFIG from '../config.json';

import "../styles/pages/User.scss"
import { hideLoader, showLoader } from "../components";
import { WithTranslation, withTranslation } from "react-i18next";
import { Notification } from "../components/Notification";
import { RootState } from "../redux/store";
import { connect, ConnectedProps } from "react-redux";
import LoaderContainer from "../components/Loader";

interface ParamsUserPage{
	login: string
}

const mapDispatchToProps = (state: RootState) => ({
	auth: state.app.auth
})

const connector = connect(mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>



const UserPage: React.FC<WithTranslation & PropsFromRedux> = props => {
	const { login } = useParams<ParamsUserPage>();
	const history = useHistory()

	const [user, setUser] = useState({} as User)
	const [loader, setLoader] = useState(false)
	const [imLoaded, setImLoaded] = useState(false)

	!loader && showLoader()
	useEffect(() => {
		API.getUser(login, 1)
			.then(data => {
				console.log(data);
				setUser(data)
				if(!loader){
					setLoader(true)
					hideLoader()
				}
			})
			.catch(err => {
				console.log("[ERROR]: ", err);
				Notification.error("Ошибка", "Кажется, данные пользователя не смогли загрузиться...", 4000)
				setTimeout(() => {
					history.push("/")
				}, 500)
			})
	}, [login, loader])


	return (
		<div className="UserPage">
			<div className="top_panel">


				<div className="top_panel_left">
					<div className="avatar">
						{/* <LoaderContainer visible={!imLoaded} size="2em"/> */}
						{
							user.avatar ?
							<img 
								ref={(input) => {
									// onLoad replacement for SSR
									if (!input) { return; }
									const img = input;
							
									const updateFunc = () => {
										setImLoaded(true)
									};
									img.onload = updateFunc;
									if (img.complete) {
										updateFunc();
									}
								}}
								src={`${CONFIG.HOST}/avatars/${user.avatar}`} 
								alt="avatar"
								/>:
							<FaImages />
						}
					</div>
					<div className="info">
						<h2 className="info_name">{user.name || "USERNAME"}</h2>
						<span className="info_login">@{user.login || "NOLOGIN"}</span>
					</div>
				</div>

				<div className="top_panel_right">
					<div className="info_rating">
						<span className="info_rating_icon"><FaStar/></span>
						<span className="info_rating_count">{user.rating || 0}</span>
					</div>
					<div className="info_position">
						<span className="info_position_cnt"><Link to="/rating" className="position_mark">#{1}</Link> {props.t("Pages.User.inRating")}!</span>
					</div>

				</div>
			</div>

			<section className="owners_deck">
				<h2 className="head_section_owners_deck">{props.t("Pages.User.LastOwnedDecks")}</h2>
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
								enableLike: props.auth
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

export default withTranslation()(connector(UserPage))