import axios from "axios"
import * as CONFIG from "./config.json"

interface OptionsRequest{
	downloadFile: boolean
}

const API_URLS: any = {
	REGISTRATION: CONFIG.HOST + CONFIG.URLS.REGISTRATION,
	LOGIN: CONFIG.HOST + CONFIG.URLS.LOGIN,
	AUTH: CONFIG.HOST + CONFIG.URLS.AUTH,
	GET_DECKS: CONFIG.HOST + CONFIG.URLS.GET_DECKS,
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
		// return axios.get(
		// 	url, 
		// 	{
		// 		params: {
		// 			...data, 
		// 			token: localStorage.getItem("token") || ""
		// 		},
		// 		responseType: options?.downloadFile? "blob": "json"
		// 	}
		// )
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

	public static getDecks(): Promise<any>{
		return this.GETFake(API_URLS.GET_DECKS, { userId: 2 })
	}
}

export default API