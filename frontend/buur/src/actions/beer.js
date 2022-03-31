import { ADD_BASKET } from "./ActionTypes";

// basket
export const addBasket = basket => ({ 
  type: ADD_BASKET,
  payload: basket
});