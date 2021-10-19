export enum LANGS{
	RUS = "RUS", 
	ENG = "ENG", 
	JPN = "JPN", 
	CHI = "CHI", 
	ITA = "ITA", 
	SPA = "SPA",
	FRA = "FRA", 
	GER = "GER"
}

export enum EStatusNotification{
	SUCCESS = "SUCCESS", 
	ERROR = "ERROR", 
	WARNING = "WARNING"
}


export const APP = {
	LOGIN: "APP/LOGIN",
	LOGOUT: "APP/LOGOUT",
	ADD_SCORES: "APP/ADD_SCORES",
}

export const NOTIFY = {
	SHOW: "NOTIFY/SHOW",
	HIDE: "NOTIFY/HIDE",
}

export enum POPUP_TYPES{
	"ALERT", "CONFIRM", "PROMPT"
}
export const POPUP = {
	SHOW: "POPUP/SHOW",
	HIDE: "POPUP/HIDE",
	SUCCESS: "POPUP/SUCCESS",
}