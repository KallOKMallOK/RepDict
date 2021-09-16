import { PayloadAction } from '@reduxjs/toolkit'
import { APP } from "../types"

const initialState = {
   auth: true,
   user: {
      name: "Данилут",
      login: "daniil00t"
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
               login: action.payload.login
            }
         }
      default:
         return state
   }
}