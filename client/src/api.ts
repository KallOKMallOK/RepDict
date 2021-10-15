import axios from "axios"
import * as CONFIG from "./config.json"
import { ActionChange } from "./domains/entities/actions.entity"
import { IDeck } from "./domains/entities/deсk.entity"

interface OptionsRequest{
	token?: boolean
	downloadFile?: boolean
}

const API_URLS: any = {
	REGISTRATION: 		CONFIG.HOST + CONFIG.URLS.REGISTRATION,
	LOGIN: 				CONFIG.HOST + CONFIG.URLS.LOGIN,
	AUTH: 				CONFIG.HOST + CONFIG.URLS.AUTH,
	GET_DECKS: 			CONFIG.HOST + CONFIG.URLS.GET_DECKS,
	GET_DECK: 			CONFIG.HOST + CONFIG.URLS.GET_DECK,
	GET_ALL_DECKS: 	CONFIG.HOST + CONFIG.URLS.GET_ALL_DECKS,
	SET_LIKE: 			CONFIG.HOST + CONFIG.URLS.SET_LIKE,
	ADD_DECK: 			CONFIG.HOST + CONFIG.URLS.ADD_DECK,
	CHANGE_DECK: 		CONFIG.HOST + CONFIG.URLS.CHANGE_DECK,
	SUBSCRIBE_DECK: 	CONFIG.HOST + CONFIG.URLS.SUBSCRIBE_DECK,
	DELETE_DECK: 		CONFIG.HOST + CONFIG.URLS.DELETE_DECK,
}

const FAKE_DATA = (url: string) => {
	switch(url){
		case API_URLS.GET_DECK:
			return JSON.parse(`
				{
					"deck": {
						"is_private": 0,
						"author_login": "admin",
						"cards": [
							{
								"answer": "реп",
								"description": null,
								"id": 1,
								"main_word": "rap",
								"type": "default"
							},
							{
								"answer": "техника",
								"description": null,
								"id": 3,
								"main_word": "flow",
								"type": "default"
							},
							{
								"answer": "богатство",
								"description": null,
								"id": 22,
								"main_word": "guap",
								"type": "default"
							},
							{
								"answer": "богатство",
								"description": null,
								"id": 32,
								"main_word": "guap",
								"type": "default"
							}
						],
						"is_owner": false,
						"owner_login": "admin",
						"description": "тут чисто про реп",
						"count_repetitions": 0,
						"liked": true,
						"subscribed": true,
						"main_language": "eng",
						"second_language": "rus",
						"price": 0,
						"count_words": 4,
						"name": "rap",
						"id": 1,
						"likes": 2
					}
				}
			`)
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
				params: options?.token ? {
					...data, 
					token: localStorage.getItem("token") || ""
				} : {
					...data
				},
				responseType: options?.downloadFile? "blob": "json"
			}
		)
	}

	private static POST(url: string, data: any, options?: OptionsRequest): Promise<any>{
		const bodyRequest = options?.token ? {
			...data, 
			token: localStorage.getItem("token") || ""
		} : {
			...data
		}
		return axios.post(
			url, 
			bodyRequest,
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
		return this.GET(API_URLS.AUTH, {  }, { token: true })
	}

	// --------------------------------------------------------------------------
	// -------------------------- Decks and Cards -------------------------------
	// --------------------------------------------------------------------------

	// ***GET DATA***

	// get decks for certain user (with token)
	private static transormArrayOfDeck(deck: any): IDeck{
		return {
			id: deck.id,
			name: deck.name,
			isPrivate: deck.is_private,
			countWords: deck.count_words,
			countRepetitions: deck.count_repetitions,
			mainLang: deck.main_language,
			secondLang: deck.second_language,
			author: deck.author_login,
			owner: deck.owner_login,
			description: deck.description,
			countLikes: deck.likes,
			activeLike: deck.liked,
			cards: deck.cards,
			subscribed: deck.subscribed
		}
	}

	public static getDecks(): Promise<any>{
		return new Promise<any> ((resolve, reject) => {
			this.GET(API_URLS.GET_DECKS, {}, { token: true })
				.then(response => {
					const data = {
						subscriptions: response.data.subscriptions.map((deck: any) => this.transormArrayOfDeck(deck)),
						owned: response.data.owned.map((deck: any) => this.transormArrayOfDeck(deck))
					}
					console.log({
						...response.data,
						...data
					})
					resolve({
						data: {
							...response.data,
							...data
						}
					})
				})
		})
		
	}

	public static getDeck(id: number): Promise<any>{
		return new Promise<any> ((resolve, reject) => {
			this.GETFake(API_URLS.GET_DECK, { id }, { token: true })
				.then(response => {
					console.log(response)
					const data: IDeck = this.transormArrayOfDeck(response.data.deck)
					resolve({
						deck: data
					})
				})
		})
	}
	
	public static getAllDecks(): Promise<any>{
		return new Promise<any> ((resolve, reject) => {
			this.GET(API_URLS.GET_ALL_DECKS, (localStorage.getItem("token")?.length !== undefined ? { token: localStorage.getItem("token") }: {}))
				.then(response => {
					const data: IDeck = response.data.decks.map((deck: any) => this.transormArrayOfDeck(deck))
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
		return this.POST(API_URLS.ADD_DECK, data, { token: true })
	}
	public static deleteDeck(deckId: number): Promise<any>{
		return this.POST(API_URLS.DELETE_DECK, { deckId }, { token: true })
	}

	// ***CHANGE DATA***
	public static applyChanges(idDeck: number, changes: ActionChange[]){
		return this.POST(API_URLS.CHANGE_DECK, { idDeck, changes}, { token: true })
	}
	
	// specific methods
	public static setLike(deckId: number): Promise<any>{
		return this.POST(API_URLS.SET_LIKE, { deckId }, { token: true })
	}

	public static subscribe(deckId: number): Promise<any>{
		return this.POST(API_URLS.SUBSCRIBE_DECK, { deckId }, { token: true })
	}
}

export default API