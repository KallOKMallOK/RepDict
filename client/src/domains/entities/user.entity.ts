import { IDeck } from "./deсk.entity";

export interface User{
	avatar: string
	average_rating: number
	balance: number
	donat_balance: number
	id: number
	is_checked: boolean
	login: string
	name: string
	rating: number
	refer: null
	token: string
	walkthroughs: number
	type_user?: "USER" | "ADMIN"
	decks?: IDeck[]
}