import { PayloadAction } from '@reduxjs/toolkit'
import * as types from "../types"

const initialState = {
   auth: false,
   user: {
      name: "",
      login: ""
   }
}

export const app = (state: Object = initialState, action: PayloadAction<any>) => {
   switch(action.type){
      case types.APP_LOGIN:
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