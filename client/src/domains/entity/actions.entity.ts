interface ActionChangeDeckPayload{
	name: string
	value: string | number
}
interface ActionChangeCardPayload{
	id: number
	name: string
	value: string | number

}
interface ActionNewCardPayload{
	main_word: string
	answer: string
	type: "default" | "choose"
	description: string | null
}

export interface ActionChange{
	type: "CHANGE_DECK" | "CHANGE_CARD" | "NEW_CARD" | "DELETE_CARD",
	payload: ActionChangeDeckPayload | ActionChangeCardPayload | ActionNewCardPayload
}