import { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../domains/entities/user.entity'
import { APP } from "../types"

interface State{
   auth: boolean,
   user: {
      name: string,
      login: string,
      balance: number
   }
}


const initialState: State = {
   auth: false,
   user: {
      name: "",
      login: "",
      balance: 0
   }
}

export const app = (state: State = initialState, action: PayloadAction<User & number>) => {
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
      case APP.ADD_SCORES:
         return {
            ...state,
            user: {
               ...state.user,
               balance: state.user.balance + action.payload
            }
         }
      default:
         return state
   }
}