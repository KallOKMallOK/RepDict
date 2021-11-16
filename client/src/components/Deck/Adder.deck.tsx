import React from 'react'
import { 
	FaPlus
} from "react-icons/fa"

type actionClick = (e: React.FormEvent<HTMLElement>, ...more: any[]) => void


interface IDeckAdd{
	add: actionClick
}

export const DeckAdd: React.FC<IDeckAdd> = props => {
	return(
		<div className="card_item card_item_noactive new_card">
			<div className="svg_wrapper" onClick={e => props.add(e)}>
				<FaPlus />
			</div>
		</div>
	)
}