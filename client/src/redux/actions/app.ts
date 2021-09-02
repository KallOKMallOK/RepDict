import * as types from "../types"

enum ERefer {NOT, GOOGLE, VK, FACEBOOK}

export interface IPerson{
	login: string,
	password: string,
	email: string,
	refer: ERefer
}
export const logIn = (person: IPerson) => {
	return {
		type: types.APP_LOGIN
	}
}