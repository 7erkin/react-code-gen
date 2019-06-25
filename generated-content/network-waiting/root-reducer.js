import initialState from './initialState'

import {
   START_LOADING_INDICATORS,
   FINISH_LOADING_INDICATORS
} from 'define right path'

import {
   startLoadingIndicators,
   finishLoadingIndicators
} from 'define right path'

const rootReducer = (state = initialState, { type, value }) => {
   switch(type){
      case START_LOADING_INDICATORS:
         return startLoadingIndicators(state)
      case FINISH_LOADING_INDICATORS:
         return finishLoadingIndicators(state, value)
      default: 
         return state
   }
}

export default rootReducer