import axios from "axios"
import * as CONFIG from "./config.json"
import { ActionChange } from "./domains/entity/actions.entity"
import { IDeck } from "./domains/entity/deсk.entity"

interface OptionsRequest{
	downloadFile: boolean
}

const API_URLS: any = {
	REGISTRATION: 	CONFIG.HOST + CONFIG.URLS.REGISTRATION,
	LOGIN: 			CONFIG.HOST + CONFIG.URLS.LOGIN,
	AUTH: 			CONFIG.HOST + CONFIG.URLS.AUTH,
	GET_DECKS: 		CONFIG.HOST + CONFIG.URLS.GET_DECKS,
	GET_ALL_DECKS: CONFIG.HOST + CONFIG.URLS.GET_ALL_DECKS,
	SET_LIKE: 		CONFIG.HOST + CONFIG.URLS.SET_LIKE,
	ADD_DECK: 		CONFIG.HOST + CONFIG.URLS.ADD_DECK,
	CHANGE_DECK: 	CONFIG.HOST + CONFIG.URLS.CHANGE_DECK,
}

const FAKE_DATA = (url: string) => {
	switch(url){
		case API_URLS.GET_DECKS:
			return {
				decks: [
				{
					is_private: 0,
					author_login: "admin",
					cards: [
						{
							answer: "реп",
							description: null,
							id: 1,
							main_word: "rap",
							type: "default"
						},
						{
							answer: "мелодия",
							description: null,
							id: 2,
							main_word: "loop",
							type: "default"
						},
						{
							answer: "техника",
							description: null,
							id: 3,
							main_word: "flow",
							type: "default"
						}
					],
					owner_login: "admin",
					description: "тут чисто про снюс",
					count_repetitions: 0,
					main_language: "eng",
					second_language: "rus",
					price: 0,
					count_words: 0,
					name: "Rap",
					id: 1,
					likes: 0
					}
				],
				error: false
			}
		default:
			return {
				error: true
			}
	}
}


// Static class for wokring with API
class API {
	private static GET(url: string, data: any, options?: OptionsRequest): Promise<any>{
		return axios.get(
			url, 
			{
				params: {
					...data, 
					token: localStorage.getItem("token") || ""
				},
				responseType: options?.downloadFile? "blob": "json"
			}
		)
	}

	private static POST(url: string, data: any, options?: OptionsRequest): Promise<any>{
		return axios.post(
			url, 
			{
				...data, 
				token: localStorage.getItem("token") || ""
			},
			{
				responseType: options?.downloadFile? "blob": "json"
			}
		)
	}

	private static GETFake (url: string, data: any, options?: OptionsRequest): Promise<any>{
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ data: FAKE_DATA(url) })
			}, 100)
		})
	}

	private POSTFake (url: string, data: any, options?: OptionsRequest): Promise<any>{
		return new Promise((resolve, reject) => {

		})
	}
	
	// --------------------------------------------------------------------------
	// ----------------------- Registration, Login, Auth ------------------------
	// --------------------------------------------------------------------------

	public static registration(data: object): Promise<any>{
		return this.POST(API_URLS.REGISTRATION, data)
	}

	public static login(data: object): Promise<any>{
		return this.POST(API_URLS.LOGIN, data)
	}

	public static auth(): Promise<any>{
		return this.GET(API_URLS.AUTH, {  })
	}

	// --------------------------------------------------------------------------
	// -------------------------- Decks and Cards -------------------------------
	// --------------------------------------------------------------------------

	// ***GET DATA***

	// get decks for certain user (with token)
	private static transormArrayOfDeck(response: any): IDeck[]{
		return [...response.data.decks.map((deck: any) => ({
			id: deck.id,
			name: deck.name,
			isPrivate: deck.is_private,
			countWords: deck.count_words,
			countRepetitions: deck.count_repetitions,
			mainLang: deck.main_language,
			secondaryLang: deck.second_language,
			author: deck.author_login,
			owner: deck.owner_login,
			description: deck.description,
			countLikes: deck.likes,
			activeLike: deck.liked,
			cards: deck.cards
		}))]
	}

	public static getDecks(): Promise<any>{
		return new Promise<any> ((resolve, reject) => {
			this.GET(API_URLS.GET_DECKS, {})
				.then(response => {
					const data: IDeck[] = this.transormArrayOfDeck(response)
					resolve({
						...response,
						data: {
							...response.data,
							decks: data
						}
					})
				})
		})
		
	}
	
	public static getAllDecks(): Promise<any>{
		return new Promise<any> ((resolve, reject) => {
			this.GET(API_URLS.GET_ALL_DECKS, {})
				.then(response => {
					const data: IDeck[] = this.transormArrayOfDeck(response)
					resolve({
						...response,
						data: {
							...response.data,
							decks: data
						}
					})
				})
		})
		
	}

	// ***POST DATA***
	public static addDeck(data: any): Promise<any>{
		return this.POST(API_URLS.ADD_DECK, data)
	}

	// ***CHANGE DATA***
	public static applyChanges(idDeck: number, changes: ActionChange[]){
		return this.POST(API_URLS.CHANGE_DECK, { idDeck, changes})
	}
	// specific methods
	public static setLike(deckId: number): Promise<any>{
		return this.POST(API_URLS.SET_LIKE, { deckId })
	}
}

export default API