import React from 'react';
import { Dispatch } from "redux"
import { RouteComponentProps } from 'react-router'
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTimesCircle } from "react-icons/fa"

import API from '../api';
import { ICard } from '../domains/entities/card.entity';
import { IDeck } from '../domains/entities/deсk.entity';

import Currsection from '../components/Currsection';
import { Notification } from '../components/Notification';
import Action from "../redux/actions"

import "../styles/pages/Play.scss"
import { WithTranslation, withTranslation } from 'react-i18next';

const mapDispatchToProps = (f: Dispatch) => ({
	addScores: (scores: number) => f(Action.app.addScores(scores))
})

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


interface IPlayProps extends RouteComponentProps, PropsFromRedux, WithTranslation{
}

interface ResultEndPlayToServer{
	idCard: number
	time: number
	answer: boolean
}

interface Results{
	main_word: string
	answer: string
	successed: boolean
	time: number
}

interface StatePlay{
	deck: IDeck | null
	cards: ICard[]
	currentCard: number
	currentLang: string
	successed: ResultEndPlayToServer[]
	valueInputAnswer: string
	ended: boolean
	showResults: boolean
	scores: number
	visibleHint: boolean
}

class Play extends React.Component<IPlayProps, StatePlay>{
	private TIME_CARD = 0
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
			showResults: false,
			scores: 0,
			visibleHint: false
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
		if(this.state.currentCard + 1 < this.state.cards.length){		
			this.setState({ 
				currentCard: this.state.currentCard + 1,
				successed: [
					...this.state.successed, 
					{ 
						idCard: this.state.cards[this.state.currentCard].id, 
						time: this.getTimeDeck("end"),
						answer: successed
					}
				]
			}, () => this.getTimeDeck("start"))
		}
		else{
			
			this.setState({ ended: true, successed: [
				...this.state.successed, 
				{ 
					idCard: this.state.cards[this.state.currentCard].id, 
					time: this.getTimeDeck("end"),
					answer: successed
				}
				]
			}, () => {
				this.getTimeDeck("start")
				API.getScoresAfterEndPlay({
					results: this.state.successed
				}, this.state.deck?.id || -1)
					.then(res => {
						// console.log(res);
						this.setState({ scores: res.data.score || 0 })
						this.props.addScores(res.data.score || 0)
					})
					.catch(err => console.log(err))
			})

		}
	}

	getTimeDeck(state: "start" | "end"): number{
		if(state === "start"){
			this.TIME_CARD = new Date().getTime()
		}
		else if(state === "end"){
			const time_card = this.TIME_CARD
			this.TIME_CARD = 0
			return Math.ceil((new Date().getTime() - time_card) / 1000)
		}
		return 0
	}

	checkCard(card: ICard, value: string): boolean{
		const answers = card.answer
			.split("|")
			.map(ans => ans.trim().toLowerCase())
			
		return answers.includes(value.toLowerCase())
	}

	handleNextCard(){
		const valueAnswer = this.state.valueInputAnswer
		if(this.checkCard(this.state.cards[this.state.currentCard], valueAnswer))
			this.nextCard(true)
		else{
			this.nextCard(false)
			this.setState({ valueInputAnswer: "" })
			// else input outline: red
		}
	}
	
	handleSkipCard(){
		this.nextCard(false)
	}

	handleChangeInputAnswer(e: React.FormEvent<HTMLInputElement>){
		if(this.checkCard(this.state.cards[this.state.currentCard], e.currentTarget.value)){
			this.setState({ valueInputAnswer: ""})
			this.nextCard(true)
		}else{
			if(e.currentTarget.value === "-"){
				this.nextCard(false)
				this.setState({ valueInputAnswer: "" })
			}
			else
				this.setState({ valueInputAnswer: e.currentTarget.value })
		}
	}

	handleHint(){
		this.setState({ visibleHint: !this.state.visibleHint })
	}

	getResults(): Results[]{
		return this.state.successed.map(suc => {
			const __card = this.state.cards.filter(card => card.id === suc.idCard)[0]
			return {
				main_word: __card.main_word,
				answer: __card.answer,
				successed: suc.answer,
				time: suc.time
			}
		})
	}

	componentDidMount(){
		const params: {id: number} = this.props.match.params as {id: number}
		const id = Number(params.id)
		if(id){
			API.getDeck(id)
				.then(resp => {
					this.getTimeDeck("start")
					this.setState({ deck: resp.deck, cards: this.shuffleCards(resp.deck.cards) })
				})
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
							[this.props.t("Pages.Play.name")]: this.state.deck?.name as string,
							[this.props.t("Pages.Play.description")]: this.state.deck?.description || "no description",
							[this.props.t("Pages.Play.currentCard")]: `${this.state.currentCard + 1} / ${this.state.deck?.cards.length}`
						}}
						/>
					<section className="lesson_section Play__card_section">
						<div className="lesson_card">
							<span className="lesson_card_lang">{this.state.deck?.mainLang.toUpperCase()}</span>
							<button className="lesson_card_hint" onClick={this.handleHint.bind(this)}>?</button>
							<div className={`hint ${this.state.visibleHint? "active": "noactive"}`}>
								{this.state.cards[this.state.currentCard]?.description}
							</div>
							<span className="lesson_card_word">{this.state.cards[this.state.currentCard]?.main_word}</span> 
						</div>
					</section>

					<section className="lesson_section answer">
						<div onClick={this.handleSkipCard.bind(this)} className="answer_button_skip_word"><FaTimesCircle /></div>
						<input 
							value={this.state.valueInputAnswer} 
							onChange={this.handleChangeInputAnswer.bind(this)} 
							type="text" className="answer_input" 
							placeholder={`${this.props.t("Pages.Play.translateOn")} ${this.state.deck?.secondLang.toUpperCase()}...`} 
							autoFocus
						/>
						<div onClick={() => this.handleNextCard()} className="answer_button_next_word"><FaArrowRight /></div>
					</section>
				</div>	
				
				{/* The end */}
				<div className={`section_congratulations ${this.state.ended && !this.state.showResults? "ended": ""}`}>
					<div className="congratulations">
						<div className="welc">
							<h2>{this.props.t("Pages.Play.congr")}</h2>
							<h3>{this.props.t("Pages.Play.congrDesc1")} &quot;{this.state.deck?.name}&quot; {this.props.t("Pages.Play.congrDesc2")}</h3>
						</div>
						<h1>{this.props.t("Pages.Play.scores")}: {this.state.scores}</h1>
						<div className="control_buttons">
							<button 
								className="btn btn-primary" 
								onClick={() => this.setState({ 
									ended: false, 
									currentCard: 0, 
									cards: this.shuffleCards(this.state.cards),
									successed: []
								})}
							>{this.props.t("Pages.Play.onceAgain")}</button>
							<button 
								className="btn btn-success" 
								onClick={() => this.setState({ showResults: true })}
							>{this.props.t("Pages.Play.results")}</button>
							<Link to="/decks" className="btn btn-danger">{this.props.t("Pages.Play.toDecks")}</Link>
						</div>
					</div>
				</div>

				<div className={`section_results ${this.state.showResults? "showed": "hided"}`}>
					<ul className="section_results_items">
						{
							this.getResults().map((result, index) => {
								return <li key={index} className="section_results_item">
									<span>{result.main_word}</span> - <span>{result.answer}</span><span>{result.successed? "Yes!": "no!"}</span><span>{result.time}</span>
								</li>
							})
						}
					</ul>
					<button className="btn btn-primary" onClick={() => this.setState({ showResults: false })}>back</button>
				</div>
			</div>
		)
	}
}


export default withTranslation()(connector(Play))
