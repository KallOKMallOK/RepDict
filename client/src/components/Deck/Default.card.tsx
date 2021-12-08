import React, { useRef, useState } from "react"
import { FaLongArrowAltRight } from "react-icons/fa"


import { ActionChange } from "../../domains/entities/actions.entity"
import { ICard } from "../../domains/entities/card.entity"



interface AdderCardDefaultProps{
	index: number
	mainLang: string
	secondLang: string
	lastIdCard: number

	// actions
	addCard: (card: ICard) => void
	addChange: (change: ActionChange) => void
	handleSwapLangs: () => void
}


const AdderCardDefault: React.FC<AdderCardDefaultProps> = props => {
	const [mainWordValue, changeMainWordValue] = useState("")
	const [secondWordValue, changeSecondWordValue] = useState("")
	const [descriptionCard, changeDescriptionCard] = useState("")

	const mainWordRef = useRef<HTMLInputElement>(null)
	const secondWordRef = useRef<HTMLInputElement>(null)
	const descriptionCardRef = useRef<HTMLTextAreaElement>(null)

	const handleChangeSecondWord__press = (e: React.KeyboardEvent<HTMLInputElement>) => { if(e.key === "Enter") handleAddCard() }

	const handleChangeDescriptionCard__press = (e: React.KeyboardEvent<HTMLTextAreaElement>) => { if(e.key === "Enter") handleAddCard() }

	const handleChangeMainWord = (e: React.FormEvent<HTMLInputElement>) => { changeMainWordValue(e.currentTarget.value) }
	
	const handleChangeSecondWord = (e: React.FormEvent<HTMLInputElement>) => { changeSecondWordValue(e.currentTarget.value) }

	const handleChangeDescriptionCard = (e: React.FormEvent<HTMLTextAreaElement>) => { changeDescriptionCard(e.currentTarget.value) }

	const handleChangeMainWord__press = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter")
			handleAddCard()
	}

	const handleAddCard = () => {
		const newCard: ICard = {
			id: props.lastIdCard + 1,
			// id: (cards[cards.length - 1] || {id: -1}).id + 1,
			main_word: mainWordValue,
			answer: secondWordValue,
			type: "default", // or type: choice
			description: descriptionCard
		}
		props.addCard(newCard)


		props.addChange({
			type: "NEW_CARD",
			payload: newCard
		})

		changeMainWordValue("")
		changeSecondWordValue("")
		changeDescriptionCard("")
	}

	return (
		<div className="card_item_panel_adding__wrapper">
			<div className="card_item_panel_adding">
				<span className="index_card">
					#{props.index}
				</span>
				<div className="main-answer-words">
					<div className="input-wrapper form-floating">
						<input 
							onKeyPress={handleChangeMainWord__press} 
							onChange={handleChangeMainWord}
							value={mainWordValue} 
							type="text" 
							className="form-control" 
							id="floatingInput" 
							placeholder="type word..." 
							ref={mainWordRef}
						/>
						<label htmlFor="floatingInput">Main word on {props.mainLang}</label>
					</div>

					<span className="card_item_panel_toggler" onClick={props.handleSwapLangs}><FaLongArrowAltRight /></span>

					<div className="input-wrapper form-floating">
						<input 
							onKeyPress={handleChangeSecondWord__press} 
							onChange={handleChangeSecondWord} 
							value={secondWordValue} 
							type="text" 
							className="form-control" 
							id="floatingInput" 
							placeholder="type word..." 
							ref={secondWordRef}
						/>
						<label htmlFor="floatingInput">Second word {props.secondLang}</label>
					</div>
				</div>

				<div className="control_bottom__wrapper">
					<textarea 
						ref={descriptionCardRef} 
						value={descriptionCard} 
						onKeyPress={handleChangeDescriptionCard__press} 
						onChange={handleChangeDescriptionCard} 
						placeholder="Type description" 
						name="" 
						id="" 
						cols={60} 
						rows={10}>
					</textarea>
					<button  className="card_item_panel_button_add" onClick={handleAddCard}>add</button>
				</div>
			</div>

		</div>
	)
}


export default AdderCardDefault