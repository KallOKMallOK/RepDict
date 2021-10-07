import React from 'react';

import "../styles/pages/Decks.scss"
import { Notification } from '../components/Notification';
import { Deck, IDeckDefault } from '../components/Deck';
import { IDeck } from "../domains/entity/desk.entity"
import API from '../api';

interface StateStore{
	decks: IDeck[]
}

interface IStoreProps{
}

class Store extends React.Component{
	public state: any = {
		decks: []
	}
	constructor(props: IStoreProps){
		super(props)
	}

	componentDidMount(){
		API.getAllDecks()
			.then(res => this.setState({ decks: res.data.decks }))
			.catch(err => console.log(err))
	}

	render(){
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
									secondaryLang={deck.secondaryLang.toUpperCase()}
									countLikes={deck.countLikes || 0}
									activeLike={deck.activeLike || false}
									cards={deck.cards}
									key={`deck_${index}`}
									/>
							})
						}

						
						
					</div>
				</section>
			</div>
		)
	}
}


export default Store;
