import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';

import "../styles/card.scss"
import { IPerson, login } from "../redux/actions/app.action"


interface IProps {
	currentWord: number,
	countWords: number,
	word: string,
	hint: string
}


const Card: React.FC<IProps> = props => {
  return (
	  <div className="card">
		  <section className="lesson_section lesson_card_wrap">
				<div className="lesson_card">
					<button className="lesson_card_hint">?</button>
					<span className="lesson_card_num">{props.currentWord}/{props.countWords}</span>
					<span className="lesson_card_word">{props.word}</span>
				</div>
			</section>

		<section className="lesson_section answer_section_wrap">
			<input type="text" className="answer_input" placeholder="Перевод.." autoFocus/>
			<div className="answer_button_next_word"></div>
		</section>
	  </div>
  );
}


const mapStateToProps = (state: RootState) => ({
	notification: state.app
})

const mapDispatchToProps = () => ({
	login: (person: IPerson) => login(person)
})


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Card)
