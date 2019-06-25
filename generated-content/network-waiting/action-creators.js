export const startLoadingIndicators = () => {
   return {
      type: START_LOADING_INDICATORS
      
   }
} 

export const finishLoadingIndicators = (arg) => {
   return {
      type: FINISH_LOADING_INDICATORS,
      value: arg
   }
} 

