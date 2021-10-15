import React from 'react';

import { Notification } from '../components/Notification';
import { showLoader, hideLoader } from "../components"
import { Deck, IDeckDefault } from '../components/Deck';
import { IDeck } from "../domains/entities/deсk.entity"
import API from '../api';
import { connect, ConnectedProps } from 'react-redux';

import "../styles/pages/Decks.scss"

interface StateStore{
	decks: IDeck[]
}

const mapStateToProps = (state: any) => ({
	auth: state.app.auth,
	notify: state.notification,
	user: state.app.user
})
const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


class Store extends React.Component<PropsFromRedux>{
	public state: any = {
		decks: []
	}
	constructor(props: PropsFromRedux){
		super(props)
		showLoader()
	}

	// Methods
	handleLike(e: any, id: number){
		console.log("like", id);
		API.setLike(id)
			.then(response => console.log(response))
			.catch(err => console.log(err))
	}


	componentDidMount(){
		API.getAllDecks()
			.then(res => {
				this.setState({ decks: res.data.decks })
				hideLoader()
			})
			.catch(err => console.log(err))
	}

	render(){
		console.log(this.state.decks);
		return(
			<div className="Store" style={{color: "white"}}>
				<section className="lesson_section">
					<h2 className="cards_main_name">Store</h2>
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
									

									like={this.handleLike}

									enableMethods={{
										enableLike: this.props.auth,
										enableSubscribe: deck.author !== this.props.user.login
									}}
									/>
							})
						}

						
						
					</div>
				</section>
			</div>
		)
	}
}


export default connector(Store)
