import React, { MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router'

import API from '../api';
import Currsection from '../components/Currsection';
import { ICard } from '../domains/entities/card.entity';
import { IDeck } from '../domains/entities/deсk.entity';

import { FaArrowRight } from "react-icons/fa"
import "../styles/pages/Play.scss"
import { Notification } from '../components/Notification';
import { Link } from 'react-router-dom';


interface IPlayProps extends RouteComponentProps{
}
interface resultEndPlay{
	idCard: number
	time: number
	answer: boolean
}

interface StatePlay{
	deck: IDeck | null
	cards: ICard[]
	currentCard: number
	currentLang: string
	successed: resultEndPlay[]
	valueInputAnswer: string
	ended: boolean
	scores: number
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
			successed: [],
			valueInputAnswer: "",
			ended: false,
			scores: 0
		}

	}
	shuffleCards(array: ICard[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}

	nextCard(successed: boolean){
		if(this.state.currentCard + 1 < this.state.cards.length)
			this.setState({ 
				currentCard: this.state.currentCard + 1,
				successed: [
					...this.state.successed, 
					{ 
						idCard: this.state.cards[this.state.currentCard].id, 
						time: 20,
						answer: successed
					}
				]
			})
		else{
			this.setState({ ended: true, successed: [
				...this.state.successed, 
				{ 
					idCard: this.state.cards[this.state.currentCard].id, 
					time: 20,
					answer: successed
				}
				]
			}, () => {
				API.getScoresAfterEndPlay({
					results: this.state.successed
				}, this.state.deck!.id)
					.then(res => {
						console.log(res);
						this.setState({ scores: res.data.score || 0 })
					})
					.catch(err => console.log(err))
			})

		}
	}

	checkCard(card: ICard, value: string, lang?: string): boolean{
		return card.answer === value
	}

	handleNextCard(){
		const valueAnswer = this.state.valueInputAnswer
		if(this.checkCard(this.state.cards[this.state.currentCard], valueAnswer))
			this.nextCard(true)
		// else input outline: red
	}
	
	handleSkipCard(){
		this.nextCard(false)
	}
	handleChangeInputAnswer(e: React.FormEvent<HTMLInputElement>){
		if(this.checkCard(this.state.cards[this.state.currentCard], e.currentTarget.value)){
			this.setState({ valueInputAnswer: ""})
			this.nextCard(true)
		}else{
			this.setState({ valueInputAnswer: e.currentTarget.value })
		}
	}

	componentDidMount(){
		const params: any = this.props.match.params
		const id = Number(params.id)
		if(Boolean(id)){
			API.getDeck(id)
				.then(resp => this.setState({ deck: resp.deck, cards: this.shuffleCards(resp.deck.cards) }))
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
							description: this.state.deck?.description || "no description",
							"current card": `${this.state.currentCard + 1} / ${this.state.deck?.cards.length}`
						}}
						/>
					<section className="lesson_section Play__card_section">
						<div className="lesson_card">
							<span className="lesson_card_lang">{this.state.deck?.mainLang.toUpperCase()}</span>
							<button className="lesson_card_hint">?</button>
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
					<div className="congratulations">
						<div className="welc">
							<h2>Congratulations!</h2>
							<h3>You have passed the "{this.state.deck?.name}" deck once again.</h3>
						</div>
						<h1>Your scores: {this.state.scores}</h1>
						<div className="control_buttons">
							<button 
								className="btn btn-primary" 
								onClick={e => this.setState({ 
									ended: false, 
									currentCard: 0, 
									cards: this.shuffleCards(this.state.cards),
									successed: []
								})}
							>Once again</button>
							<Link to="/decks" className="btn btn-success">To Decks</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default Play;
