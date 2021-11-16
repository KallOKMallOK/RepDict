import { IDeck } from '../../domains/entities/deсk.entity'
import { Deck } from "./Default.deck"
import { DeckActive } from "./Active.deck"
import { DeckAdd } from "./Adder.deck"

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


export {
	Deck,
	DeckActive,
	DeckAdd
}