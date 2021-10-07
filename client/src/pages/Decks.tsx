import React, { MouseEvent } from 'react';

import API from "../api"
// Components and redux instances
import { LANGS } from "../redux/types"
import { 
	Deck, 
	DeckActive, 
	DeckAdd,
} from "../components/Deck"


// App styles
import "../styles/pages/Decks.scss"
import { Notification } from '../components/Notification';

interface IDecksProps {
	init?: boolean
	textHello?: string
}

class Decks extends React.Component<IDecksProps>{
	public state: any = {
		decks: [
			// {
			// 	id: 1,
			// 	name: "Kitchen",
			// 	countWords: 3,
			// 	countRepetitions: 5,
			// 	isPrivate: false,
			// 	mainLang: LANGS.RUS,
			// 	secondaryLang: LANGS.ENG,
			// 	author: "daniil00t",
			// 	authorLink: "/user/8",
			// 	description: "This deck about kitchen and some subjects in there",
			// }
		],
		isEdit: false,
		idEdit: -1
	}
	constructor(props: IDecksProps){
		super(props)
	}

	addDeck(e: MouseEvent<any>){
		this.setState({
			isEdit: true
		})
	}

	saveDeck(e: MouseEvent<HTMLElement>, id: number, changes: any[]){
		console.log('save');
		this.setState({
			isEdit: false
		})
	}
	editDeck(e: MouseEvent<HTMLElement>, id: number){
		this.setState({
			isEdit: true
		})
	}
	deleteDeck(e: MouseEvent<HTMLElement>, id: number){
		console.log("delete", id)
	}
	like(){
		console.log("like");
	}
	changePrivate(e: any, valuePrivate: boolean){
		console.log(valuePrivate);
	}

	componentDidMount(){
		API.getDecks()
			// .then(data => console.log(data))
			.then(data => !data.error && this.setState({ decks: [...this.state.decks, ...data.data.decks] }))
			.catch(err => Notification.error("Error", "Failed to load data", 3000))
	}

	render(){
		return(
			<React.Fragment>
				<section className="lesson_section">
					<h2 className="cards_main_name">My Decks</h2>
					<div className="cards">
						{/* deck for edit and add */}

						{
							this.state.isEdit && <DeckActive 
								id={1}
								name="New Deck" 
								countWords={3} 
								countRepetitions={4} 
								isPrivate={true} 
								mainLang={LANGS.RUS} 
								secondaryLang={LANGS.ENG} 
								words={[]}


								save={this.saveDeck.bind(this)}
								delete={this.deleteDeck}
								/>
						}

						{/* Adding deck */}
						<DeckAdd add={this.addDeck.bind(this)} />
						
						{
							this.state.decks.map((deck: any) => {
								return <Deck
									id={deck.id}
									name={deck.name}
									countWords={deck.count_words || 0} 
									author={deck.author_login}
									owner={deck.owner_login}
									description={deck.description}
									countRepetitions={deck.count_repetitions || 0} 
									isPrivate={deck.is_private} 
									mainLang={deck.main_language.toUpperCase()} 
									secondaryLang={deck.second_language.toUpperCase()}
									countLikes={deck.likes || 0}
									activeLike={deck.liked || false}

									// active methods
									edit={this.editDeck.bind(this)}
									delete={this.deleteDeck}
									like={this.like}
									changePrivate={this.changePrivate.bind(this)}
									/>
							})
						}

						
						
					</div>
				</section>
			</React.Fragment>
		)
	}
}

export default Decks;
