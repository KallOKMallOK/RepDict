import React, { MouseEvent, useRef, useState } from 'react'
import { 
	FaPlus,
	FaLock,
	FaLockOpen,
	FaEllipsisV,
	FaHeart
} from "react-icons/fa"
import { Link, useHistory } from 'react-router-dom'
import API from '../api'
import { ActionChange } from '../domains/entities/actions.entity'
import { ICard } from '../domains/entities/card.entity'
import { IDeck } from '../domains/entities/deсk.entity'
import useOutsideClick from '../hoc/OutsideClicker'

import { LANGS } from "../redux/types"
import { EditText } from './EditText'
import { Notification } from './Notification'


// -----------------------------------------------------------------------------
// -------------------------------- Deck ---------------------------------------
// -----------------------------------------------------------------------------

type actionClick = (e: MouseEvent<any>, ...more: any[]) => void

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
}



export const Deck: React.FC<IDeckDefault> = props => {

	const history = useHistory()
	// Component states
	const [dropdownVisible, openDropdown] = useState(false)
	const [activedLike, activeLike] = useState(props.activeLike || false)
	const [subscribed, changeSubscribed] = useState(props.subscribed || false)

	// Data states
	const [countLikes, changeCountLikes] = useState(props.countLikes || 0)
	const [isPrivate, changePrivate] = useState(props.isPrivate || false)

	const dropdownRef = useRef<any>(null)

	useOutsideClick(dropdownRef, () => {
		if(dropdownVisible) openDropdown(false)
	})

	const likeUser = (e: any) => {
		console.log(props.enableMethods)
		if(props.enableMethods?.enableLike){
			activeLike(!activedLike)
			activedLike?
				changeCountLikes(countLikes - 1):
				changeCountLikes(countLikes + 1)
			props.like!(e, props.id)
		}
		else{
			Notification.warning("Warning", "Please, sign in", 3000)
		}
	}

	const handleChangePrivate = (e: any) => {
		if(props.author === props.owner){
			props.changePrivate!(e, props.id, !isPrivate)
			changePrivate(!isPrivate)
		}
	}
	const handleEdit = (e: any, index: number) => {
		openDropdown(false)
		props.edit!(e, props.index)
	}
	const handleChangeSubscribed = (e: any) => {
		props.subscribe !== undefined && props.subscribe(e, props.id)
		API.subscribe(props.id)
			.then(resp => {
				console.log(resp);
				Notification.success("Ok", "All okey")
			})
			.catch(err => console.log(err))
		changeSubscribed(!subscribed)
	}

  	return (
	<div className="card_item card_item_noactive">
		{/* control items */}
			<div className="control">
				<span className="icon" onClick={e => openDropdown(!dropdownVisible)}><FaEllipsisV/></span>
				<ul className={`dropdown ${dropdownVisible ? "active": "noactive"}`} ref={dropdownRef}>
					<li className="dropdown_item" onClick={e => history.push(`/play/${props.id}`)}>Play</li>
					{
						props.enableMethods?.enableEdit && 
							<li className="dropdown_item" onClick={e => handleEdit(e, props.index)}>Edit</li>
					}
					{
						props.enableMethods?.enableDelete && 
						<li className="dropdown_item" onClick={e => props.delete!(e, props.id)}>Delete</li>
					}
					{
						props.enableMethods?.enableClone && 
							<li className="dropdown_item" onClick={e => props.clone!(e, props.id)}>Clone</li>
					}
					
					
				</ul>
			</div>

		{/* HEAD OF DECK */}
		<p className="card_item_head">
			{
				(props.enableMethods !== undefined && props.enableMethods.enableChangePrivate) &&
					<span 
						style={{cursor: props.author === props.owner ? "pointer": "default"}}
						className="private_lock" 
						onClick={e => handleChangePrivate(e)}
					>
						{isPrivate? <FaLock/>: <FaLockOpen/>}
					</span>
			}
			
			<span className="card_item_head_name">{props.name}</span>
			{
				// props.author !== props.owner && 
				<Link to={`/user/${props.author}`} className="author">(by {props.author} {props.author !== props.owner? `edited ${props.owner}`: ""})</Link> 
			}
		</p>

		
		<div className="middle_layer">
			<div className="card_item_head_langs">
				<div className="lang main_lang">{props.mainLang}</div>/
				<div className="lang sec_lang">{props.secondLang}</div>
			</div>
			<div className="info">
				<p className="info_count_words">{props.countWords} words</p>
				<p className="info_count_repetitions">{props.countRepetitions} repetitions</p>
			</div>
		</div>

		<p className="card_item_description">{props.description}</p>

		<div className="footer">
			{
				props.enableMethods?.enableSubscribe ?
					<button className={`btn btn-${!subscribed? "primary": "danger"}`} onClick={e => handleChangeSubscribed(e)}>{subscribed? "Unsubscribe": "Subscribe"}</button>:
					<div></div>
			}
			<span className="likes" onClick={e => likeUser(e)}>
				<span className={`heart ${activedLike? "active": "noactive"}`}><FaHeart/></span>
				{countLikes}
			</span>
		</div>
	</div>
  );
}


// -----------------------------------------------------------------------------
// ----------------------------- Active Deck -----------------------------------
// -----------------------------------------------------------------------------


export interface IDeckActive extends IDeckDefault{
	save?: actionClick
	create?: actionClick
}


export const DeckActive: React.FC<IDeckActive> = props => {
	const [cards, addCard] = useState(props.cards)
	const [countCards, incCountCards] = useState(props.countWords)
	const [changes, addChange] = useState([] as ActionChange[])
	const [name, changeName] = useState(props.name || "Deck name")
	// const [isPrivate, changeName] = useState(props.name || "Deck name")

	const mainWordRef = useRef<HTMLInputElement>(null)
	const secondWordRef = useRef<HTMLInputElement>(null)

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

	const handleAddCard = (e: any) => {
		const newCard: ICard = {
			id: -1,
			main_word: mainWordRef.current?.value!,
			answer: secondWordRef.current?.value!,
			type: "default",
			description: ""
		}
		addCard(oldCards => [...oldCards, newCard])
		incCountCards(countCardsOld => countCardsOld + 1)
		addChange(oldChanges => {
			return [...oldChanges, {
				type: "NEW_CARD",
				payload: newCard
			}]
		})
		// mainWordRef.current?.value = ""
	}

	// For creating
	const handleCreateDeck = (e: any) => {
		const dataNewDeck = {
			name,
			isPrivate: false,
			description: "",
			mainLang: "RU",
			secondLang: "ENG",
			price: 0,
			cards: cards
		}
		props.create!(e, dataNewDeck)
	}

	return (
		<div className="card_item card_item_active">
			<p className="card_item_name"><EditText text={name} typeInput="text" onChanged={(old, _new) => handleChangeName(_new as string)}/></p>
			<span className="card_item_count_words">{countCards} words</span>
			<p className="card_item_count_repetitions">{props.countRepetitions} repetitions</p>
			<div className="card_item_panel_adding">

				<div className="form-floating mb-3">
					<input type="text" className="form-control" id="floatingInput" placeholder="type word..." ref={mainWordRef}/>
					<label htmlFor="floatingInput">Main word</label>
				</div>

				<span className="card_item_panel_toggler">↔</span>

				<div className="form-floating mb-3">
					<input type="text" className="form-control" id="floatingInput" placeholder="type word..." ref={secondWordRef}/>
					<label htmlFor="floatingInput">Second word</label>
				</div>


				<button  className="card_item_panel_button_add" onClick={handleAddCard}>add</button>


				<div className="card_item_panel_item_words">
					<ul className="card_item_panel_item_words_ul">
						{
							cards.map((card: ICard) => {
								return <li className="item">
									<span className="main_word">{card.main_word}</span>
									-
									<span className="second_word">{card.answer}</span>
								</li>
							})
						}
					</ul>
				</div>
			</div>
			<div className="buttons_group">
				{
					props.enableMethods?.enableCreate && 
					<button className="button_manipulate" onClick={handleCreateDeck}>create</button>
				}
				{
					props.enableMethods?.enableSave && 
						<button className="button_manipulate" onClick={e => props.save!(e, props.id, changes)}>save</button>
				}
				{
					props.enableMethods?.enableDelete &&
						<button className="button_manipulate" onClick={e => props.delete!(e, props.id)}>delete</button>
				}
			</div>
		</div>
	)
}

// -----------------------------------------------------------------------------
// ------------------------------ Deck Add -------------------------------------
// -----------------------------------------------------------------------------

interface IDeckAdd{
	add: actionClick
}

export const DeckAdd: React.FC<IDeckAdd> = props => {
	return(
		<div className="card_item card_item_noactive new_card">
			<div className="svg_wrapper">
				<FaPlus onClick={e => props.add(e)}/>
			</div>
		</div>
	)
}




