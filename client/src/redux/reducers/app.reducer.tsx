import { PayloadAction } from '@reduxjs/toolkit'
import { APP } from "../types"

const initialState = {
   auth: false,
   user: {
      name: "",
      login: "",
      balance: 0
   }
}

export const app = (state: Object = initialState, action: PayloadAction<any>) => {
   switch(action.type){
      case APP.LOGIN:
         localStorage.setItem("token", action.payload.token)
         return {
            ...state,
            auth: true,
            user: {
               name: action.payload.name,
               login: action.payload.login,
               balance: action.payload.balance
            }
         }
      case APP.LOGOUT:
         localStorage.removeItem("token")
         return {
            ...state,
            auth: false,
            user: {
               name: "",
               login: "",
               balance: 0
            }
         }
      default:
         return state
   }
}