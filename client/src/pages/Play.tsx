import React, { MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router'

import API from '../api';
import Currsection from '../components/Currsection';
import { ICard } from '../domains/entities/card.entity';
import { IDeck } from '../domains/entities/deсk.entity';

import { FaArrowRight } from "react-icons/fa"
import "../styles/pages/Play.scss"
import { Notification } from '../components/Notification';


interface IPlayProps extends RouteComponentProps{
}
interface StatePlay{
	deck: IDeck | null
	cards: ICard[]
	currentCard: number
	currentLang: string
	successed: number
	valueInputAnswer: string
	ended: boolean
}

class Play extends React.Component<IPlayProps, StatePlay>{
	// private answerRef = React.createRef<HTMLInputElement>()

	constructor(props: IPlayProps){
		super(props)

		this.state = {
			deck: null,
			cards: [],
			currentLang: "ENG",
			currentCard: 0,
			successed: 0,
			valueInputAnswer: "",
			ended: false
		}

	}
	shuffleDecks(array: ICard[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}

	checkCard(card: ICard, value: string, lang?: string): boolean{
		return card.answer === value
	}

	handleNextCard(){
		const valueAnswer = this.state.valueInputAnswer
		if(this.state.currentCard + 1 < this.state.cards.length){
			if(this.checkCard(this.state.cards[this.state.currentCard], valueAnswer)){
				this.setState({ currentCard: this.state.currentCard + 1, successed: this.state.successed + 1 })
			}
			else{

			}
		}
		else{
			this.setState({ ended: true })
		}
	}
	
	handleSkipCard(){
		if(this.state.currentCard + 1 < this.state.cards.length)
			this.setState({ currentCard: this.state.currentCard + 1 })
		else{
			this.setState({ ended: true })
		}
	}
	handleChangeInputAnswer(e: React.FormEvent<HTMLInputElement>){
		if(this.checkCard(this.state.cards[this.state.currentCard], e.currentTarget.value)){
			this.setState({ valueInputAnswer: "", currentCard: this.state.currentCard + 1 })
		}else{
			this.setState({ valueInputAnswer: e.currentTarget.value })
		}
	}

	componentDidMount(){
		const params: any = this.props.match.params
		const id = Number(params.id)
		if(Boolean(id)){
			API.getDeck(id)
				.then(resp => this.setState({ deck: resp.deck, cards: this.shuffleDecks(resp.deck.cards) }))
				.catch(err => console.log(err))
		}
		else{
			this.props.history.push("/decks")
			Notification.warning("You have not choise Deck", "Please, choose playing Deck", 4000)
		}
	}

	render(){
		return(
			<div className="Play page" style={{color: "white"}}>
				<div className={`Play__card ${this.state.ended? "ended": ""}`}>
					<Currsection 
						info = {{ 
							name: this.state.deck?.name,
							description: this.state.deck?.description,
							"current card": `${this.state.currentCard + 1} / ${this.state.deck?.cards.length}`
						}}
						/>
					<section className="lesson_section Play__card_section">
						<div className="lesson_card">
							<span className="lesson_card_lang">{this.state.deck?.mainLang.toUpperCase()}</span>
							<button className="lesson_card_hint">?</button>
							{/* <span className="lesson_card_num">{props.currentWord}/{props.countWords}</span>
							*/}
							<span className="lesson_card_word">{this.state.cards[this.state.currentCard]?.main_word}</span> 
						</div>
					</section>

					<section className="lesson_section answer">
						<div onClick={this.handleSkipCard.bind(this)} className="answer_button_skip_word">Skip</div>
						<input value={this.state.valueInputAnswer} onChange={this.handleChangeInputAnswer.bind(this)} type="text" className="answer_input" placeholder={`translate on ${this.state.deck?.secondLang.toUpperCase()}...`} autoFocus/>
						<div onClick={this.handleNextCard.bind(this)} className="answer_button_next_word"><FaArrowRight /></div>
					</section>
				</div>	
				

				<div className={`section_congratulations ${this.state.ended? "ended": ""}`}>

				</div>
			</div>
		)
	}
}


export default Play;
