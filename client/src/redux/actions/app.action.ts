import { APP, ELangsInterface } from "../types"

// enum ERefer {NOT, GOOGLE, VK, FACEBOOK}
enum ELangs {
	"en", "ru"
}

export interface IPerson{
	login: string,
	name: string
	balance: number
}

export const login = (person: IPerson) => {
	return {
		type: APP.LOGIN,
		payload: person
	}
}
export const logout = () => {
	return {
		type: APP.LOGOUT,
	}
}

export const addScores = (scores: number) => {
	return {
		type: APP.ADD_SCORES,
		payload: scores
	}
}

export const changeLang = (lang: ELangsInterface) => ({
	type: APP.CHANGE_LANG,
	payload: lang
})