import React, { MouseEvent } from 'react';


// Components and redux instances
import { LANGS } from "../redux/types"
import { 
	Deck, 
	DeckActive, 
	DeckAdd, 
	IDeck, 
	IDeckActive
} from "../components/Deck"


// App styles
import "../styles/pages/Cards.scss"

interface ICardsProps {
	init?: boolean
	textHello?: string
}

class Cards extends React.Component<ICardsProps>{
	public state: any = {
		decks: [
			{
				id: 1,
				name: "Kitchen",
				countWords: 3,
				countRepetitions: 5,
				isPrivate: false,
				mainLang: LANGS.RUS,
				secondaryLang: LANGS.ENG
			}
		],
		isEdit: false,
		idEdit: -1
	}
	constructor(props: ICardsProps){
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

	render(){
		return(
			<React.Fragment>
				<section className="lesson_section">
					<h2 className="cards_main_name">My Cards</h2>
					<div className="cards">

						

						{
							this.state.isEdit && <DeckActive 
								id={1}
								name="Kitchen" 
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
						<DeckAdd add={this.addDeck.bind(this)} />
						
						{
							this.state.decks.map((deck: any) => {
								return <Deck
									id={deck.id}
									name={deck.name}
									countWords={deck.countWords} 
									author="daniil00t"
									authorLink="/user/8"
									description="This deck about kitchen and some subjects in there"
									countRepetitions={deck.countRepetitions} 
									isPrivate={deck.isPrivate} 
									mainLang={deck.mainLang} 
									secondaryLang={deck.secondaryLang}
									countLikes={10}
									activeLike={false}

									edit={this.editDeck.bind(this)}
									delete={this.deleteDeck}
									/>
							})
						}

						
						
					</div>
				</section>
			</React.Fragment>
		)
	}
}

export default Cards;
