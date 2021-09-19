import React, { MouseEvent, useRef, useState } from 'react'
import { 
	FaPlus,
	FaLock,
	FaLockOpen,
	FaEllipsisV,
	FaHeart
} from "react-icons/fa"
import { Link } from 'react-router-dom'
import useOutsideClick from '../hoc/OutsideClicker'

import { LANGS } from "../redux/types"


// -----------------------------------------------------------------------------
// -------------------------------- Deck ---------------------------------------
// -----------------------------------------------------------------------------

type actionClick = (e: MouseEvent<any>, ...more: any[]) => void

export interface IDeck {
	// Properties
	id: number,
	name: string,
	countWords: number,
	isPrivate: boolean,
	countRepetitions: number,
	mainLang: LANGS,
	secondaryLang: LANGS,
	author?: string,
	authorLink?: string,
	description?: string
	countLikes?: number
	activeLike?: boolean

	// Actions
	edit?: actionClick,
	delete?: actionClick,
	like?: actionClick
}



export const Deck: React.FC<IDeck> = props => {

	const [dropdownVisible, openDropdown] = useState(false)
	const [activedLike, activeLike] = useState(props.activeLike || false)
	const [countLikes, changeCountLikes] = useState(props.countLikes || 0)

	const dropdownRef = useRef<any>(null)

	useOutsideClick(dropdownRef, () => {
		if(dropdownVisible) openDropdown(false)
	})

	const likeUser = (e: any) => {
		activeLike(!activedLike)
		activedLike?
			changeCountLikes(countLikes - 1):
			changeCountLikes(countLikes + 1)
		props.like!(e)
	}

  	return (
	<div className="card_item card_item_noactive">
		{/* control items */}
		<div className="control">
			<span className="icon" onClick={e => openDropdown(!dropdownVisible)}><FaEllipsisV/></span>
			<ul className={`dropdown ${dropdownVisible ? "active": "noactive"}`} ref={dropdownRef}>
				<li className="dropdown_item" onClick={props.edit}>Edit</li>
				<li className="dropdown_item" onClick={props.delete}>Delete</li>
			</ul>
		</div>
		<p className="card_item_head">
			<span className="private_lock">{props.isPrivate? <FaLock/>: <FaLockOpen/>}</span>
			<span className="card_item_head_name">{props.name}</span>
			{props.author !== undefined && <Link to={props.authorLink || "/users"} className="author">(by {props.author})</Link> }
			
		</p>

		
		<div className="middle_layer">
			<div className="card_item_head_langs">
				<div className="lang main_lang">{props.mainLang}</div>/
				<div className="lang sec_lang">{props.secondaryLang}</div>
			</div>
			<div className="info">
				<p className="info_count_words">{props.countWords} words</p>
				<p className="info_count_repetitions">{props.countRepetitions} repetitions</p>
			</div>
		</div>

		<p className="card_item_description">{props.description}</p>

		<div className="footer">
			<span className="likes" onClick={e => likeUser(e)}>
				<span className={`heart ${activedLike? "active": "noactive"}`}><FaHeart/></span>
				{countLikes}
			</span>
		</div>
		{/* <div className="buttons_group">
			<button className="button_manipulate" onClick={e => props.edit!(e, props.id)}>edit</button>
			<button className="button_manipulate" onClick={e => props.delete!(e, props.id)}>delete</button>
		</div> */}
	</div>
  );
}


// -----------------------------------------------------------------------------
// ----------------------------- Active Deck -----------------------------------
// -----------------------------------------------------------------------------

export interface IDeckActive extends IDeck{
	words: any[],
	save: actionClick
}


export const DeckActive: React.FC<IDeckActive> = props => {
	return (
		<div className="card_item card_item_active">
			<p className="card_item_name">Nature</p>
			<span className="card_item_count_words">23 words</span>
			<p className="card_item_count_repetitions">3 repetitions</p>
			<div className="card_item_panel_adding">

				<div className="form-floating mb-3">
					<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
					<label htmlFor="floatingInput">Email address</label>
				</div>

				<span className="card_item_panel_toggler">↔</span>

				<div className="form-floating mb-3">
					<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
					<label htmlFor="floatingInput">Email address</label>
				</div>


				<button  className="card_item_panel_button_add">add</button>


				<div className="card_item_panel_item_words">
					<ul className="card_item_panel_item_words_ul">
						<li className="item">First - Link</li>
						<li className="item">Second - Link</li>
						<li className="item">Third - Link</li>
						<li className="item">Fourth - Link</li>
						<li className="item">Fifth - Link</li>
						<li className="item">Sixth - Link</li>
						<li className="item">Seventh - Link</li>
						<li className="item">Eighth - Link</li>
						<li className="item">Ninth - Link</li>
						<li className="item">Tenth - Link</li>
						<li className="item">Eleventh Link</li>
						<li className="item">Twelfth Link</li>
						<li className="item">Thirteenth Link</li>
						<li className="item">Fourteenth Link</li>
						<li className="item">Fifteenth Link</li>
						<li className="item">Sixteenth Link</li>
						<li className="item">Seventeenth Link</li>
						<li className="item">Eighteenth Link</li>
						<li className="item">Nineteenth Link</li>
						<li className="item">Twentieth Link</li>
					</ul>
				</div>
			</div>
			<div className="buttons_group">
				<button  className="button_manipulate" onClick={e => props.save(e, props.id, [])}>save</button>
				<button  className="button_manipulate" onClick={e => props.delete!(e, props.id)}>delete</button>
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
			<FaPlus onClick={e => props.add(e)}/>
		</div>
	)
}




