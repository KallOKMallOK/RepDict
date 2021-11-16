import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import API from '../api';
import { showLoader, hideLoader } from "../components"
import { Deck, IDeckDefault } from '../components/Deck';
import Pagination from "../components/Pagination"

import "../styles/pages/Decks.scss"
import { RootState } from '../redux/store';
import { WithTranslation, withTranslation } from 'react-i18next';

interface StateStore{
	decks: IDeckDefault[]
	currentPage: number
	countPages: number
}

const mapStateToProps = (state: RootState) => ({
	auth: state.app.auth,
	notify: state.notification,
	user: state.app.user
})
const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector> & WithTranslation


class Store extends React.Component<PropsFromRedux, StateStore>{
	public state: StateStore = {
		decks: [],
		currentPage: 1,
		countPages: 1
	}
	constructor(props: PropsFromRedux){
		super(props)
		showLoader()
	}

	// Methods
	handleLike(e: unknown, id: number){
		console.log("like", id);
		API.setLike(id)
			.then(response => console.log(response))
			.catch(err => console.log(err))
	}
	handleClone(e: unknown, id: number){
		API.cloneDeck(id)
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}

	updateDecks(page: number){
		// showLoader()
		API.getAllDecks(page)
		.then(res => {
			console.log(res)
			this.setState({ decks: res.data.decks, countPages: res.data.pages })
			hideLoader()
		})
		.catch(err => console.log(err))
	}
	handleChangeCurrentPage(choosen: { selected: number }){
		this.setState({ currentPage: choosen.selected + 1 })
		this.updateDecks( choosen.selected + 1 )
	}

	componentDidMount(){
		this.updateDecks(this.state.currentPage)
	}

	render(){
		console.log(this.state.decks);
		return(
			<div className="Store" style={{color: "white"}}>
				<section className="lesson_section">
					<h2 className="cards_main_name">{this.props.t("Pages.Store.Store")}</h2>
					<div className="cards">
						{
							this.state.decks.length !== 0 && this.state.decks.map((deck: IDeckDefault, index: number) => {
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
									subscribed={deck.subscribed}
									clone={this.handleClone}

									like={this.handleLike}

									enableMethods={{
										enableLike: this.props.auth,
										enableSubscribe: deck.author !== this.props.user.login && this.props.auth,
										enableClone: this.props.auth
									}}
									/>
							})
						}
					</div>

					<Pagination 
						countPages={this.state.countPages}
						changeCountPages={() => console.log()}
						changeCurrentPage={choosen => this.handleChangeCurrentPage(choosen)}
					/>
				</section>
			</div>
		)
	}
}


export default withTranslation()(connector(Store))
