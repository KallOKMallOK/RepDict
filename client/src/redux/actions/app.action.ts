import * as types from "../types"

enum ERefer {NOT, GOOGLE, VK, FACEBOOK}

export interface IPerson{
	login: string,
	name: string
}

export const login = (person: IPerson) => {
	return {
		type: types.APP_LOGIN,
		payload: person
	}
}