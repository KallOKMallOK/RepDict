import React, { MouseEvent } from 'react'
import { FaPlus } from "react-icons/fa"

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
	description?: string

	// Actions
	edit?: actionClick,
	delete?: actionClick
}



export const Deck: React.FC<IDeck> = props => {
  return (
	<div className="card_item card_item_noactive">
		<p className="card_item_name">{props.name}</p>
		<span className="card_item_count_words">{props.countWords} words</span>
		<p className="card_item_count_repetitions">{props.countRepetitions} repetitions</p>
		<div className="buttons_group">
			<button className="button_manipulate" onClick={e => props.edit!(e, props.id)}>edit</button>
			<button className="button_manipulate" onClick={e => props.delete!(e, props.id)}>delete</button>
		</div>
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




