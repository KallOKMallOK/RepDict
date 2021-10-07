import { APP } from "../types"

enum ERefer {NOT, GOOGLE, VK, FACEBOOK}

export interface IPerson{
	login: string,
	name: string
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