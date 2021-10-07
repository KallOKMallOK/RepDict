export interface ICard{
	id: number
	main_word: string
	answer: string
	description: string
	type: "default" | "choose"
}