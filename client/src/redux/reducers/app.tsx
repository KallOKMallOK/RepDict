import { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
   auth: false
}

export const app = (state: Object = initialState, action: PayloadAction<any>) => {
   switch(action.type){
      default:
         return state
   }
}