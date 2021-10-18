import React, { MouseEvent } from 'react';

import API from "../api"
import { showLoader, hideLoader } from "../components"
// Components and redux instances
import { 
	Deck, 
	DeckActive, 
	DeckAdd,
	IDeckDefault
} from "../components/Deck"


// App styles
import "../styles/pages/Decks.scss"
import { Notification } from '../components/Notification';
import { ActionChange } from '../domains/entities/actions.entity';
import { connect, ConnectedProps } from 'react-redux';
import { Modal } from '../components/modals';
import { notification } from '../redux/reducers/notification.reducer';

interface IDecksProps {
	init?: boolean
	textHello?: string
}

interface StateDecks{
	decksSubscriptions: IDeckDefault[]
	decksOwned: IDeckDefault[]
	isNewDeck: boolean
	isEdit: boolean
	deckEdit: IDeckDefault | null
}
const mapStateToProps = (state: any) => ({
	user: state.app.user
})
const connector = connect(mapStateToProps)

type PropsFromRedux = IDecksProps & ConnectedProps<typeof connector>


class Decks extends React.Component<PropsFromRedux, StateDecks>{
	public state: StateDecks = {
		decksSubscriptions: [],
		decksOwned: [],

		isNewDeck: false,
		isEdit: false,
		deckEdit: null
	}
	constructor(props: PropsFromRedux){
		super(props)
		showLoader()
	}

	addDeck(e: React.FormEvent<any>){
		this.setState({
			isNewDeck: true
		})
	}

	saveDeck(e: React.FormEvent<any>, id: number, changes: ActionChange[]){
		API.applyChanges(id, changes)
			.then(response => {
				console.log(response)
				this.setState({ isEdit: false })
			})
			.catch(err => console.log(err))
	}
	editDeck(e: React.FormEvent<any>, index: number){
		console.log("edit", index);
		this.setState({
			isEdit: true,
			deckEdit: this.state.decksOwned[index]
		})
	}
	deleteDeck(e: React.FormEvent<any>, id: number){
		Modal.confirm(
			"Вы действительно хотите удалить дек?", 
			"Если вы удалите дек, все карточки тоже удалятся, вы уверены, что хотите это сделать?",
			() => {},
			(accept) => {
				if(accept){
					API.deleteDeck(id)
						.then(response => {
							console.log(response);
							if(!response.data.error){
								this.setState({ decksOwned: this.state.decksOwned.filter(deck => deck.id !== id) })
								Notification.success("OK", "Дек успешно удален", 3000)
							}
						})
						.catch(err => {
							Notification.error("Ошбика", "Дек не успешно удален", 3000)
						})
				}
					
			})
		// Notification.success("Hello!", "Content", 3000)
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
				this.setState({ isNewDeck: false, decksOwned: [...this.state.decksOwned, {...data}] })
			})
			.catch(err => console.log(err))
	}

	handleUnsibscribe(e: any, id: number){
		this.setState({ decksSubscriptions: this.state.decksSubscriptions.filter(deck => deck.id !== id) })
	}
	handleCloseActiveAddingDeck(e: React.FormEvent<any>){
		this.setState({ isNewDeck: false })
	}
	handleCloseActiveEditingDeck(e: React.FormEvent<any>){
		this.setState({ isEdit: false })
	}

	componentDidMount(){
		console.log(this.state.decksOwned);
		if(this.state.decksOwned.length === 0){
			API.getDecks()
				// .then(data => console.log(data))
				.then(data => {
					console.log(data);
					!data.error && 
					this.setState({
						decksSubscriptions: [...this.state.decksSubscriptions, ...data.data.subscriptions.reverse()],
						decksOwned: [...this.state.decksOwned, ...data.data.owned.reverse()],
					})
					hideLoader()
				})
				.catch(err => Notification.error("Error", "Failed to load data", 3000))
		}
	}
	render(){

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
								secondLang={this.state.deckEdit!.secondLang} 
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
								close={this.handleCloseActiveEditingDeck.bind(this)}
								save={this.saveDeck.bind(this)}
								delete={this.deleteDeck.bind(this)}
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
								secondLang={"ENG"} 
								cards={[]}
								author={this.props.user.login}
								owner={this.props.user.login}
								description={""}
								countLikes={0}
								activeLike={false}

								enableMethods={{
									enableCreate: true
								}}
								close={this.handleCloseActiveAddingDeck.bind(this)}
								create={this.createNewDeck.bind(this)}

							/>
						}

						{/* Adding deck */}
						<DeckAdd add={this.addDeck.bind(this)} />
						{
							this.state.decksOwned.length !== 0 && this.state.decksOwned.map((deck: IDeckDefault, index: number) => {
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
										enableChangePrivate: true, 
										enableDelete: true, 
										enableEdit:true,
										enableLike: true
									}}

									// active methods
									edit={this.editDeck.bind(this)}
									delete={this.deleteDeck.bind(this)}
									like={this.like}
									changePrivate={this.changePrivate.bind(this)}
									/>
							})
						}
					</div>
				</section>

				<section className={`lesson_section ${this.state.decksSubscriptions.length === 0? "noactive": "active"}`}>
					<h2 className="cards_main_name">My Subscribed Decks</h2>
					<div className="cards">
					{
							this.state.decksSubscriptions.length !== 0 && this.state.decksSubscriptions.map((deck: IDeckDefault, index: number) => {
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
									subscribe={this.handleUnsibscribe.bind(this)}

									// enables
									enableMethods={{ 
										enableLike: true,
										enableSubscribe: true
									}}

									// active methods
									like={this.like}
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
