import axios from "axios"
import * as CONFIG from "./config.json"

interface OptionsRequest{
	downloadFile: boolean
}

// Static class for wokring with API
class API {
	static API_URLS: any = {
		REGISTRATION: CONFIG.HOST + CONFIG.URLS.REGISTRATION,
		LOGIN: CONFIG.HOST + CONFIG.URLS.LOGIN,
		AUTH: CONFIG.HOST + CONFIG.URLS.AUTH,
	}

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
	
	// --------------------------------------------------------------------------
	// ----------------------- Registration, Login, Auth ------------------------
	// --------------------------------------------------------------------------

	public static registration(data: object): Promise<any>{
		return this.POST(this.API_URLS.REGISTRATION, data)
	}

	public static login(data: object): Promise<any>{
		return this.POST(this.API_URLS.LOGIN, data)
	}

	public static auth(): Promise<any>{
		return this.GET(this.API_URLS.AUTH, {  })
	}
}

export default API