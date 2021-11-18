import React, { MouseEvent, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { 
	FaLock,
	FaLockOpen,
	FaEllipsisV,
	FaHeart,
	FaTimes
} from "react-icons/fa"
import { Link, useHistory } from 'react-router-dom'
import Linkify from 'react-linkify'
import API from '../../api'
import { ICard } from '../../domains/entities/card.entity'
import { IDeck } from '../../domains/entities/deсk.entity'
import useOutsideClick from '../../hoc/OutsideClicker'

import { Notification } from '../Notification'

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


interface WatchContainerProps {
	nameCard: string
	id: number
	author: string
	cards: ICard[]
	visible: boolean
	close: () => void
}

const WatchContainer: React.FC<WatchContainerProps> = props => {
	const history = useHistory()
	const thisRef = useRef<HTMLDivElement>(null)
	useOutsideClick(thisRef, () => {
		props.close()
	})

	if(props.visible) return(
		<div className={`watch_container`}>
			<div className="watcher" ref={thisRef}>
				<div className="name_card">{props.nameCard}</div>
				<div className="author">by <Link to={`/user/${props.author}`}>{props.author}</Link></div>
				<div className="close" onClick={() => props.close()}>
					<FaTimes />
				</div>
				<div className="card_item_panel_item_words">
					<ul className="card_item_panel_item_words_ul">
						{
							props.cards.map((card: ICard, index: number) => {
								return <li className="item" key={index}>
									<span className="index">#{index + 1}. </span>
									<span className="main_word">{card.main_word}</span>
									-
									<span className="second_word">{card.answer}</span>
								</li>
							})
						}
					</ul>
				</div>
				<div className="btn_wrapper">
					<button className="__btn btn_play" onClick={() => history.push(`/play/${props.id}`)}>play</button>
				</div>
			</div>

		</div>
	)
	else return null
}


export const Deck: React.FC<IDeckDefault> = props => {

	const history = useHistory()
	// Component states
	const [dropdownVisible, openDropdown] = useState(false)
	const [activedLike, activeLike] = useState(props.activeLike || false)
	const [subscribed, changeSubscribed] = useState(props.subscribed || false)
	const [watched, changeWatched] = useState(false)

	// Data states
	const [countLikes, changeCountLikes] = useState(props.countLikes || 0)
	const [isPrivate, changePrivate] = useState(props.isPrivate || false)

	const dropdownRef = useRef<HTMLUListElement>(null)

	useOutsideClick(dropdownRef, () => {
		if(dropdownVisible) openDropdown(false)
	})

	const likeUser = (e: MouseEvent<HTMLSpanElement>) => {
		console.log(props.enableMethods)
		if(props.enableMethods?.enableLike){
			activeLike(!activedLike)
			activedLike?
				changeCountLikes(countLikes - 1):
				changeCountLikes(countLikes + 1)
			props.like?.(e, props.id)
		}
		else{
			Notification.warning("Warning", "Please, sign in", 3000)
		}
	}

	const handleChangePrivate = (e: MouseEvent<HTMLSpanElement>) => {
		if(props.author === props.owner){
			props.changePrivate?.(e, props.id, !isPrivate)
			changePrivate(!isPrivate)
		}
	}
	const handleEdit = (e: MouseEvent<HTMLLIElement>) => {
		openDropdown(false)
		props.edit?.(e, props.index)
	}
	const handleChangeSubscribed = (e: MouseEvent<HTMLButtonElement>) => {
		props.subscribe !== undefined && props.subscribe(e, props.id)
		API.subscribe(props.id)
			.then(resp => {
				console.log(resp);
				Notification.success("Готово!", "Теперь вы подписаны на эту колоду")
			})
			.catch(err => console.log(err))
		changeSubscribed(!subscribed)
	}

	return (
	<div className="card_item card_item_noactive">
		{
			watched && ReactDOM.createPortal(
				<WatchContainer
					id={props.id}
					author={props.author || ""}
					nameCard={props.name}
					close={() => changeWatched(false)} 
					visible={watched} 
					cards={props.cards}
				/>,
				document.getElementById("root-modals") || document.body
			)
		}
		{/* control items */}
			<div className="control">
				<span className="icon" onClick={() => openDropdown(!dropdownVisible)}><FaEllipsisV/></span>
				<ul className={`dropdown ${dropdownVisible ? "active": "noactive"}`} ref={dropdownRef}>
					<li className="dropdown_item" onClick={() => changeWatched(true)}>Watch</li>
					<li className="dropdown_item" onClick={() => history.push(`/play/${props.id}`)}>Play</li>
					{
						props.enableMethods?.enableEdit && 
							<li className="dropdown_item" onClick={e => handleEdit(e)}>Edit</li>
					}
					{
						props.enableMethods?.enableDelete && 
						<li className="dropdown_item" onClick={e => props.delete?.(e, props.id)}>Delete</li>
					}
					{
						props.enableMethods?.enableClone && 
							<li className="dropdown_item" onClick={e => props.clone?.(e, props.id)}>Clone</li>
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
			
			<span className="card_item_head_name" onClick={() => history.push(`/play/${props.id}`)}>{props.name}</span>
			{
				// props.author !== props.owner && 
				<Link to={`/user/${props.author}`} className="author">(by {props.author})</Link> 
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

		<p className="card_item_description"><Linkify>{props.description}</Linkify></p>

		<div className="footer">
			{
				props.enableMethods?.enableSubscribe ?
					<button 
						className={`btn btn-${!subscribed? "primary": "danger"}`} 
						onClick={e => handleChangeSubscribed(e)}>
							{subscribed? "Unsubscribe": "Subscribe"}
					</button>:
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