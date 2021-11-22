import { Dispatch } from "redux"
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router'
import { connect, ConnectedProps } from 'react-redux';
import { FaArrowRight, FaTimesCircle, FaArrowsAltH } from "react-icons/fa"

import API from '../api';
import { ICard } from '../domains/entities/card.entity';
import { IDeck } from '../domains/entities/deсk.entity';

import Action from "../redux/actions"
import Currsection from '../components/Currsection';
import { Notification } from '../components/Notification';

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
	lastLang: string
	endedWithLastLang: boolean
	successed: ResultEndPlayToServer[]
	valueInputAnswer: string
	ended: boolean
	showResults: boolean
	scores: number
	visibleHint: boolean
}

interface LangTogglerProps{
	// data props
	mainLang: string
	secondLang: string
	changeable: boolean

	// component props
	className?: string
	// Actions
	changeLang: (changedLang: string) => void
}

const LangToggler: React.FC<LangTogglerProps> = (props) => {
	const [mainLangBool, setMainLangBool] = useState(true)
	
	const handleChangeLang = (lang: string, mainBool: boolean) => {
		props.changeLang(lang)
		setMainLangBool(mainBool)
	}
	return (
		<div className={`lang_toggler ${props.className || ""}`}>
			<span 
				className={`main_lang_button main_lang_button-${!mainLangBool? "non-actived": "actived"}`}
				onClick={() => props.changeable && handleChangeLang(props.mainLang, true)}>
					{props.mainLang}
			</span>
			<span className="lang_toggler__seporator" onClick={() => props.changeable && handleChangeLang(mainLangBool? props.secondLang : props.mainLang, !mainLangBool)}><FaArrowsAltH /></span>
			<span 
				className={`second_lang_button second_lang_button-${mainLangBool? "non-actived": "actived"}`}
				onClick={() => props.changeable && handleChangeLang(props.secondLang, false)}>
					{props.secondLang}
			</span>
		</div>
	)
}

interface ListResultsProps{
	results: Results[]
}

const ListResults: React.FC<ListResultsProps> = props => {
	return (
		<>
			<h2 className="section_results__header">Results</h2>
			<ul className="section_results_header_list">
				<li>Main word</li>
				<li>Answer word</li>
				<li>Correct</li>
				<li>Time answer</li>
			</ul>
			<ul className="section_results_list">
				{
					props.results.map((result, index) => {
						return <li key={index} className="section_results_list__item">
							<span className="section_results_list__item__main_word">{result.main_word}</span>
							<span className="section_results_list__item__answer">{result.answer}</span>
							<div className={`section_results_list__item__successed section_results_list__item__successed-${result.successed? "correct": "non-correct"}`}>
								<span>{result.successed? "Correct": "Wrong"}</span>
							</div>
							<span className="section_results_list__item__time">{result.time}s</span>
						</li>
					})
				}
			</ul>
		</>
	)
}


class Play extends React.Component<IPlayProps, StatePlay>{
	private TIME_CARD = 0
	constructor(props: IPlayProps){
		super(props)

		this.state = {
			deck: null,
			cards: [],
			currentLang: "ENG",
			lastLang: "ENG",
			endedWithLastLang: true,
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
				endedWithLastLang: true,
				lastLang: this.state.currentLang,
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
		const answers = this.state.endedWithLastLang?
			(this.state.currentLang === this.state.deck?.mainLang? 
			card.answer
				.split("|")
				.map(ans => ans.trim().toLowerCase()):
			card.main_word
				.split("|")
				.map(ans => ans.trim().toLowerCase())):
			(this.state.lastLang === this.state.deck?.mainLang? 
				card.answer
					.split("|")
					.map(ans => ans.trim().toLowerCase()):
				card.main_word
					.split("|")
					.map(ans => ans.trim().toLowerCase()))
		
		
			
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
	handleForceFinishGame(){
		this.setState({
			ended: true
		})
		API.getScoresAfterEndPlay({
			results: this.state.successed
		}, this.state.deck?.id || -1)
			.then(res => {
				// console.log(res);
				this.setState({ scores: res.data.score || 0 })
				this.props.addScores(res.data.score || 0)
			})
			.catch(err => console.log(err))
	}
	componentDidMount(){
		const params: {id: number} = this.props.match.params as {id: number}
		const id = Number(params.id)
		if(id){
			API.getDeck(id)
				.then(resp => {
					this.getTimeDeck("start")
					this.setState({ 
						deck: resp.deck, 
						cards: this.shuffleCards(resp.deck.cards),
						currentLang: resp.deck.mainLang
					})
				})
				.catch(err => {
					this.props.history.push("/")
					Notification.error("Ошибка!", "Либо такой колоды не существует, либо она приватная", 3000)
				})
		}
		else{
			this.props.history.push("/decks")
			Notification.warning("You have not choise Deck", "Please, choose playing Deck", 4000)
		}
	}

	render(){
		console.log(this.state.currentLang, this.state.endedWithLastLang, this.state.endedWithLastLang &&
			this.state.currentLang === this.state.deck?.mainLang);
		return(
			<div className="Play page" style={{color: "white"}}>
				<div className={`Play__card ${this.state.ended? "ended": ""}`}>


					<div className="top_panel">
						<div className="top_left_panel">
							<Currsection 
								className="top_panel__currsection"
								info = {{ 
									[this.props.t("Pages.Play.name")]: this.state.deck?.name as string,
									[this.props.t("Pages.Play.description")]: this.state.deck?.description || "no description",
									[this.props.t("Pages.Play.currentCard")]: `${this.state.currentCard + 1} / ${this.state.deck?.cards.length}`
								}}
							/>
						</div>

						<div className="top_right_panel">
							<LangToggler 
								className="top_right_panel__lang_toggler"
								changeable={this.state.endedWithLastLang}
								mainLang={this.state.deck?.mainLang || ""}
								secondLang={this.state.deck?.secondLang || ""}
								changeLang={lang => this.state.endedWithLastLang && this.setState({ currentLang: lang, lastLang: this.state.currentLang, endedWithLastLang: false })}
							/>
							<button onClick={() => this.handleForceFinishGame()} className="top_right_panel__button_finish">Force Finish</button>
						</div>
						
					</div>


					<section className="lesson_section Play__card_section">
						<div className="lesson_card">

							<span className="lesson_card_lang">
								{
									this.state.currentLang === this.state.lastLang ? 
										this.state.currentLang.toUpperCase() :
										`${this.state.lastLang.toUpperCase()} -> ${this.state.currentLang.toUpperCase()}`
								}
							</span>

							<button className="lesson_card_hint" onClick={this.handleHint.bind(this)}>?</button>
							<div className={`hint ${this.state.visibleHint? "active": "noactive"}`}>
								{this.state.cards[this.state.currentCard]?.description}
							</div>
							<span className="lesson_card_word">
								{this.state.endedWithLastLang?
									(this.state.currentLang === this.state.deck?.mainLang?
										this.state.cards[this.state.currentCard]?.main_word:
										this.state.cards[this.state.currentCard]?.answer):
									(this.state.lastLang === this.state.deck?.mainLang?
											this.state.cards[this.state.currentCard]?.main_word:
											this.state.cards[this.state.currentCard]?.answer)
								}
							</span> 
						</div>
					</section>




					<section className="lesson_section answer">
						<div onClick={this.handleSkipCard.bind(this)} className="answer_button_skip_word"><FaTimesCircle /></div>
						<input 
							autoFocus
							value={this.state.valueInputAnswer} 
							onChange={this.handleChangeInputAnswer.bind(this)} 
							type="text" className="answer_input" 
							placeholder={`${this.props.t("Pages.Play.translateOn")} ${!this.state.endedWithLastLang ? (this.state.lastLang === this.state.deck?.mainLang ? this.state.deck.secondLang : this.state.deck?.mainLang): (this.state.currentLang === this.state.deck?.mainLang ? this.state.deck.secondLang : this.state.deck?.mainLang)}...`} 
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
					<ListResults results={this.getResults()}/>
					<button className="btn btn-primary" onClick={() => this.setState({ showResults: false })}>back</button>
				</div>
			</div>
		)
	}
}


export default withTranslation()(connector(Play))
