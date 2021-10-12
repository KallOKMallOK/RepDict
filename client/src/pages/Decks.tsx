import React, { MouseEvent } from 'react';

import API from "../api"
// Components and redux instances
import { LANGS } from "../redux/types"
import { 
	IDeckActive,
	Deck, 
	DeckActive, 
	DeckAdd,
	IDeckDefault
} from "../components/Deck"


// App styles
import "../styles/pages/Decks.scss"
import { Notification } from '../components/Notification';
import { ActionChange } from '../domains/entity/actions.entity';
import { connect, ConnectedProps } from 'react-redux';

interface IDecksProps {
	init?: boolean
	textHello?: string
}

interface StateDecks{
	decks: IDeckDefault[]
	isNewDeck: boolean
	isEdit: boolean
	deckEdit: IDeckDefault | null
}
const mapStateToProps = (state: any) => ({
	auth: state.app.auth,
	user: state.app.user,
	notify: state.notification
})
const connector = connect(mapStateToProps)

type PropsFromRedux = IDecksProps & ConnectedProps<typeof connector>


class Decks extends React.Component<PropsFromRedux, StateDecks>{
	public state: StateDecks = {
		decks: [],

		isNewDeck: false,
		isEdit: false,
		deckEdit: null
	}
	constructor(props: PropsFromRedux){
		super(props)
	}

	addDeck(e: MouseEvent<any>){
		this.setState({
			isNewDeck: true
		})
	}

	saveDeck(e: MouseEvent<HTMLElement>, id: number, changes: ActionChange[]){
		API.applyChanges(id, changes)
			.then(response => {
				console.log(response)
				this.setState({ isEdit: false })
			})
			.catch(err => console.log(err))
	}
	editDeck(e: MouseEvent<HTMLElement>, index: number){
		console.log("edit", index);
		this.setState({
			isEdit: true,
			deckEdit: this.state.decks[index]
		})
	}
	deleteDeck(e: MouseEvent<HTMLElement>, id: number){
		console.log("delete", id)
	}

	like(e: any, id: number){
		API.setLike(id)
			.then(res => console.log(res))
			.catch(err => console.log(err))
		console.log("like", id);
	}

	changePrivate(e: any, id: number, valuePrivate: boolean){
		API.applyChanges(id, [
			{
				type: "CHANGE_DECK",
				payload: {
					name: "isPrivate",
					value: Number(valuePrivate)
				}
			}
		])
			.then(resp => console.log(resp))
			.catch(err => console.log(err))
	}

	createNewDeck(e: any, data: any){
		API.addDeck(data)
			.then(response => {
				console.log(response)
				this.setState({ isNewDeck: false })
			})
			.catch(err => console.log(err))
	}

	componentDidMount(){
		API.getDecks()
			// .then(data => console.log(data))
			.then(data => {
				console.log(data);
				!data.error && this.setState({ decks: [...this.state.decks, ...data.data.decks] })
			})
			.catch(err => Notification.error("Error", "Failed to load data", 3000))
	}

	render(){
		console.log(this.props.auth)
		return(
			<React.Fragment>
				<section className="lesson_section">
					<h2 className="cards_main_name">My Decks</h2>
					<div className="cards">

						{/* deck for EDIT */}
						{

							this.state.isEdit && <DeckActive
								index={-1}
								id={this.state.deckEdit!.id}
								name={this.state.deckEdit!.name} 
								countWords={this.state.deckEdit!.countWords} 
								countRepetitions={this.state.deckEdit!.countRepetitions} 
								isPrivate={this.state.deckEdit!.isPrivate} 
								mainLang={this.state.deckEdit!.mainLang} 
								secondaryLang={this.state.deckEdit!.secondaryLang} 
								cards={this.state.deckEdit!.cards}
								author={this.state.deckEdit!.author}
								owner={this.state.deckEdit!.owner}
								description={this.state.deckEdit!.description}
								countLikes={this.state.deckEdit!.countLikes || 0}
								activeLike={this.state.deckEdit!.activeLike || false}

								enableMethods={{
									enableSave: true,
									enableDelete: true
								}}
								save={this.saveDeck.bind(this)}
								delete={this.deleteDeck}
								/>
						}
						{/* New Deck */}
						{
							this.state.isNewDeck && <DeckActive
								index={-1}
								id={-1}
								name={"New Deck"} 
								countWords={0} 
								countRepetitions={0} 
								isPrivate={false} 
								mainLang={"RU"} 
								secondaryLang={"ENG"} 
								cards={[]}
								author={this.props.user.login}
								owner={this.props.user.login}
								description={""}
								countLikes={0}
								activeLike={false}

								enableMethods={{
									enableCreate: true
								}}
								create={this.createNewDeck}

							/>
						}

						{/* Adding deck */}
						<DeckAdd add={this.addDeck.bind(this)} />
						
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

									// enables
									enableMethods={{ 
										enableChangePrivate: true, 
										enableDelete: true, 
										enableEdit:true,
										enableLike: true
									}}

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

export default connector(Decks)
