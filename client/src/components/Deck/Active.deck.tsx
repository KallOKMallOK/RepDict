import React, { MouseEvent, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { 
	FaTimes,
	FaLongArrowAltRight,
	FaArrowsAltH,
	FaCaretUp
} from "react-icons/fa"

// import { Components }
import AdderCardDefault from "./Default.card"
import AdderCardChoice from "./Choice.card"
import { EditText } from '../EditText'
import { Notification } from '../Notification'


// import { Entities }
import { ActionChange } from '../../domains/entities/actions.entity'
import { ICard } from '../../domains/entities/card.entity'
import { IDeck } from '../../domains/entities/deсk.entity'
import useOutsideClick from '../../hoc/OutsideClicker'
import Select, { components } from 'react-select'



// -----------------------------------------------------------------------------
// -------------------------------- Deck ---------------------------------------
// -----------------------------------------------------------------------------

type actionClick = (e: React.FormEvent<HTMLElement>, ...more: any[]) => void

interface enableMethodsOptions{
	enableDelete?: boolean
	enableEdit?: boolean
	enableLike?: boolean
	enableChangePrivate?: boolean
	enableSubscribe?: boolean
	enableSave?: boolean
	enableCreate?: boolean
	enableClone?: boolean
}

export interface IDeckDefault extends IDeck{
	index: number
	enableMethods?: enableMethodsOptions
	// Actions
	edit?: actionClick
	delete?: actionClick
	like?: actionClick
	changePrivate?: actionClick
	subscribe?: actionClick
	clone?: actionClick
	watch?: actionClick
}

interface EditedCardProps extends ICard{
	visible: boolean
	positionElement: {x: number, y: number}

	eventOnChangeMainWord?: (value: string) => void
	eventOnChangeSecondWord?: (e: React.FormEvent<HTMLInputElement>) => void
	eventOnChangeDescriptionCard?: (e: React.FormEvent<HTMLTextAreaElement>) => void

	close: (e: React.FormEvent<HTMLElement> | null) => void
	save: (changes: ActionChange[], idCard: number) => void
}


const EditedCard: React.FC<EditedCardProps> = props => {
	const [mainWordChanged, setMainWordChanged] = useState(false)
	const [answerChanged, setAnswerChanged] = useState(false)
	const [descriptionChanged, setDescriptionChanged] = useState(false)
	const [mainWord, changeMainWord] = useState(props.main_word)
	const [answer, changeAnswer] = useState(props.answer)
	const [description, changeDescription] = useState(props.description)

	const thisRef = useRef<HTMLDivElement>(null)

	const handleChangeMainWord = (e: React.FormEvent<HTMLInputElement>) => {
		props.eventOnChangeMainWord?.(e.currentTarget.value)
		changeMainWord(e.currentTarget.value)
		setMainWordChanged(true)
	}

	const handleChangeAnswer = (e: React.FormEvent<HTMLInputElement>) => {
		props.eventOnChangeSecondWord?.(e)
		changeAnswer(e.currentTarget.value)
		setAnswerChanged(true)
	}

	const handleChangeDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
		props.eventOnChangeDescriptionCard?.(e)
		changeDescription(e.currentTarget.value)
		setDescriptionChanged(true)
	}

	const handleSaveChanges = () => {
		let __changes: ActionChange[] = []
		if(mainWordChanged)
			__changes  = [...__changes, {
				type: "CHANGE_CARD",
				payload: {
					name: "main_word",
					id: props.id,
					value: mainWord
				}
			}]
		if(answerChanged)
			__changes  = [...__changes, {
				type: "CHANGE_CARD",
				payload: {
					name: "answer",
					id: props.id,
					value: answer
				}
			}]
		if(descriptionChanged)
			__changes  = [...__changes, {
				type: "CHANGE_CARD",
				payload: {
					name: "description",
					id: props.id,
					value: description
				}
			}]
		console.log(__changes);
		props.save(__changes, props.id)
		props.close(null)
	}

	useOutsideClick(thisRef, () => {
		if(props.visible) props.close(null)
	})

	return (
		ReactDOM.createPortal(
			<div ref={thisRef} className="editedCardWatch" style={{display: props.visible? "block": "none", top: props.positionElement.y + 240, left: props.positionElement.x - 20}}>
				<div className="wrapper">
					<div className="beforeTringle">
						<FaCaretUp />
					</div>
					<div className="closeEditedCard" onClick={e => props.close(e)}>
						<FaTimes />
					</div>

					<div className="control-top">
						<input type="text" className="__input __input_default" value={mainWord} onChange={e => handleChangeMainWord(e)}/>
						<FaLongArrowAltRight />
						<input type="text" className="__input __input_default" value={answer} onChange={e => handleChangeAnswer(e)}/>
					</div>

					<textarea name="description" className="__input __input_default" id="" cols={10} rows={2} value={description} onChange={e => handleChangeDescription(e)}></textarea>
					<button className="__btn" onClick={handleSaveChanges}>save</button>
				</div>
			</div>,
			document.getElementById("root") || document.body
		)
	)
}





export interface IDeckActive extends IDeckDefault{
	close: actionClick
	save?: actionClick
	create?: actionClick
}


export const DeckActive: React.FC<IDeckActive> = props => {
	const [cards, changeCards] = useState(props.cards)
	const [countCards, incCountCards] = useState(props.countWords)
	const [changes, addChange] = useState([] as ActionChange[])
	const [name, changeName] = useState(props.name)
	const [currentTypeCard, setCurrentTypeCard] = useState({value: "default", label: "Default"})

	const [indexCard, changeIndexCard] = useState(1)

	console.log(changes);
	// Edited card menu
	const [currentCardOpened, changeCurrentCardOpened] = useState(cards[0])
	const [visibleCardWatch, changeVisibleCardWatch] = useState(false)
	const [positionCard, changePositionCard] = useState({x: 0, y: 0})

	const [mainLang, changeMainLang] = useState("ENG")
	const [secondLang, changeSecondLang] = useState("RU")
	// const [isPrivate, changeName] = useState(props.name || "Deck name")

	const descriptionDeckRef = useRef<HTMLTextAreaElement>(null)
	

	const LANGS = [
		"RUS",
		"ENG",
		"JPN",
		"CHI",
		"ITA",
		"SPA",
		"FRA",
		"GER"
	]


	const handleChangeName = (newValue: string) => {
		changeName(newValue)
		const payloadChangeName = {
			name: "name",
			value: newValue
		}
		addChange(oldChanges => {
			return [...oldChanges, {
				type: "CHANGE_DECK",
				payload: payloadChangeName
			}]
		})
	}


	const handleChangeMainLang = (e: React.FormEvent<HTMLSelectElement>) => { changeMainLang(e.currentTarget.value) }

	const handleChangeSecondLang = (e: React.FormEvent<HTMLSelectElement>) => { changeSecondLang(e.currentTarget.value) }

	const handleChangeMainWordInConsistCard = (value: string, id: number) => {
		changeCards((oldCards) => {
			const __cards = oldCards.map(item => {
				if(item.id === id)
					item.main_word = value
				return item
			})
			console.log(oldCards, value, id);
			return __cards
		})
	}

	const handleSwapLangs = () => {
		const __mainLang = mainLang
		changeMainLang(secondLang)
		changeSecondLang(__mainLang)
	}

	// For creating
	const handleCreateDeck = (e: MouseEvent<HTMLButtonElement>) => {
		const dataNewDeck: Partial<IDeck & {description: string, price: number}> = {
			name,
			isPrivate: false,
			description: descriptionDeckRef.current?.value,
			mainLang: mainLang,
			secondLang: secondLang,
			price: 0,
			cards: cards
		}
		cards.length !== 0 ? 
			props.create?.(e, dataNewDeck):
			Notification.warning("Предупреждение!", "Вы не добавили ни одной карточки!", 2500)
	}

	const handleDeleteCard = (e: MouseEvent<HTMLDivElement>, index: number) => {
		e.stopPropagation()
		changeVisibleCardWatch(false)
		changeCards(oldCards => oldCards.filter((_, _index: number) => _index !== index))
		addChange(changes => [...changes, {
			type: "DELETE_CARD",
			payload: {
				id: cards[index].id
			}
		}])
	}
	
	const handleOpenCardForWatch = (e: MouseEvent<HTMLLIElement>, index: number) => {
		changePositionCard({x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop})
		changeCurrentCardOpened(cards[index])
		changeVisibleCardWatch(true)
	}

	const handleChangeCard = (changesCard: ActionChange[]) => {
		console.log(changesCard);
		addChange((old) => [...old, ...changesCard])
	} 
	// ----------------------------------------------------------------------------
	// ---------------------------- Export JSON -----------------------------------
	// ----------------------------------------------------------------------------

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleExportFileAsJSON = (e: React.FormEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files || []
		const file = files[0]
		const reader = new FileReader()

		reader.onload = function() {
			const data = JSON.parse(reader.result as string)
			uploadJSONToCards(data.decks)
		}

		reader.readAsText(file);
	}

	const uploadJSONToCards = (cards: ICard[]) => {
		cards.map((card, index) => {
			if(index >= 20 && index < 40){
				const newCard: ICard = {
					id: card.id,
					main_word: card.main_word,
					answer: card.answer,
					type: "default",
					description: ""
				}
				changeCards(oldCards => [...oldCards, newCard])
				incCountCards(countCardsOld => countCardsOld + 1)
				addChange(oldChanges => {
					return [...oldChanges, {
						type: "NEW_CARD",
						payload: newCard
					}]
				})
			}
		})
		
	}

	// -----------------------------------------------------------------------------
	// ---------------------- Handle methods for cards -----------------------------
	// -----------------------------------------------------------------------------
	
	const switcherAdderCard = (type: string) => {
		switch(type){
			case "default":
				return (
					<AdderCardDefault 
						index={indexCard}
						mainLang={mainLang}
						secondLang={secondLang}
						lastIdCard={(cards[cards.length - 1] || {id: -1}).id}

						// actions
						addCard={handleAddCard}
						addChange={change => addChange(__changes => [...__changes, change])}
						handleSwapLangs={() => handleSwapLangs()}
					/>
				)
			case "choice":
				return (
					<AdderCardChoice 
						index={indexCard}
						mainLang={mainLang}
						secondLang={secondLang}
						lastIdCard={(cards[cards.length - 1] || {id: -1}).id}

						// actions
						addCard={handleAddCard}
						addChange={change => addChange(__changes => [...__changes, change])}
						handleSwapLangs={() => handleSwapLangs()}
					/>
				)
			default:
		}
	}

	const handleAddCard = (card: ICard) => {
		changeCards(__cards => [...__cards, card])
		changeIndexCard(indexCard => indexCard + 1)
		
	}

	return (
		<div className="card_item card_item_active">
			<div className="close" onClick={props.close}>
				<FaTimes />
			</div>


			<p className="card_item_name">
				<EditText text={name} typeInput="text" focus onChanged={(old, _new) => handleChangeName(_new as string)}/>
			</p>
			<div className="top-panel">
				<div className="select_languages">
					<select onChange={handleChangeMainLang} className="form-select" aria-label="Default select example">
						{
							LANGS.map((lang, index) => {
								return <option key={index} selected={lang === mainLang}>{lang}</option>
							})
						}
					</select>


					<span className="card_item_panel_toggler" onClick={handleSwapLangs}><FaArrowsAltH /></span>

					<select onChange={handleChangeSecondLang} className="form-select" aria-label="Default select example">
						{
							LANGS.map((lang, index) => {
								return <option key={index} selected={lang === secondLang}>{lang}</option>
							})
						}
					</select>

					{/* <input type="file" onChange={handleExportFileAsJSON}/> */}
				</div>
				{/* PLUG for jcsb */}
				<div></div>
			</div>

			<div className="info">
				<span className="card_item_count_words">{countCards} words</span>
				<p className="card_item_count_repetitions">{props.countRepetitions} repetitions</p>
			</div>

			<div className="description_deck__wrapper">
				<textarea 
					defaultValue={props.description || ""} 
					ref={descriptionDeckRef} 
					placeholder="Type description deck" 
					name="" 
					id="" 
					cols={60} 
					rows={10}>
				</textarea>
				<Select
					options={[
						{
							value: "default",
							label: "Default"
						},
						{
							value: "choice",
							label: "Choice"
						}
					]}
					onChange={e => setCurrentTypeCard(e || {value: "", label: ""})}
					value={currentTypeCard}
					isSearchable={false}
					components={{
						Control: ({ children, ...rest }) => (
							<components.Control {...rest}>
								{children}
							</components.Control>
						)}
					}
					className="select_current_type_card"
				/>
			</div>


			{/* Adder Card -> switch type*/}
			


			{
				switcherAdderCard(currentTypeCard.value)
			}
			
			{
				visibleCardWatch && <EditedCard 
					visible={visibleCardWatch}
					id={currentCardOpened?.id}
					main_word={currentCardOpened?.main_word}
					answer={currentCardOpened?.answer}
					description={currentCardOpened?.description}
					type="default"
					positionElement={positionCard}

					eventOnChangeMainWord={e => handleChangeMainWordInConsistCard(e, currentCardOpened?.id)}

					close={() => changeVisibleCardWatch(false)}
					save={handleChangeCard}
				/>
			}

			<div className="card_item_panel_item_words">
				<ul className="card_item_panel_item_words_ul">
					{
						cards.map((card: ICard, index: number) => {
							return <li key={index} className="item" onClick={e => handleOpenCardForWatch(e, index)}>
								<span className="index">#{index + 1}. </span>
								<span className="main_word">{card.main_word}</span>
								-
								<span className="second_word">{card.answer}</span>
								<div className="close_deck" onClick={e => handleDeleteCard(e, index)}><FaTimes/></div>
							</li>
						})
					}
				</ul>
			</div>
			


			<div className="buttons_group">
				{
					props.enableMethods?.enableCreate && 
					<button className="__btn __button-default button-create" onClick={handleCreateDeck}>create</button>
				}
				{
					props.enableMethods?.enableSave && 
						<button className="__btn __button-default button-save mr-5" onClick={e => props.save?.(e, props.id, changes)}>save</button>
				}
				{
					props.enableMethods?.enableDelete &&
						<button className="__btn __button-default button-delete" onClick={e => props.delete?.(e, props.id)}>delete</button>
				}
			</div>
		</div>
	)
}