import React, { useState } from "react"

// import { Entities }
import { ActionChange } from "../../domains/entities/actions.entity"
import { ICard } from "../../domains/entities/card.entity"
import { EditText } from "../EditText"

interface AdderCardChoiceProps{
	index: number
	mainLang: string
	secondLang: string
	lastIdCard: number

	// actions
	addCard: (card: ICard) => void
	addChange: (change: ActionChange) => void
	handleSwapLangs: () => void
}


const AdderCardChoice: React.FC<AdderCardChoiceProps> = props => {
	const [answers, setAnswers] = useState([] as string[])


	const handleChangeAnswer = (text: string, index: number) => {
		setAnswers(__answers => __answers.map((answer, __index) => index === __index ? text : answer ))
	}

	const handleAddAnswer = () => {
		setAnswers(__answers => [...__answers, "new answer"])
	}
	return(
		<div className="card_item_panel_adding__wrapper">
			<div className="card_item_panel_adding">
				<span className="index_card">
					#{props.index}
				</span>

				<div className="card_item_panel_adding__question">
					<textarea 
						// ref={descriptionCardRef} 
						// value={descriptionCard} 
						// onKeyPress={handleChangeDescriptionCard__press} 
						// onChange={handleChangeDescriptionCard} 
						placeholder="Type description" 
						name="" 
						id="" 
						cols={60} 
						rows={10}>
					</textarea>
				</div>

				<div className="card_item_panel_adding__list_answers">
					<ol>
							{
								answers.map((answer, index) => {
									return <li key={index}>
										<span>{index + 1}.</span>
										<EditText text={answer} typeInput="text" focus onChanged={(_, _new) => handleChangeAnswer(_new as string, index)}/>
									</li>
								})
							}
					</ol>
					<button className="__btn" onClick={handleAddAnswer}>add answer</button>
				</div>

				<button className="__btn">add</button>
			</div>
		</div>
	)
}

export default AdderCardChoice