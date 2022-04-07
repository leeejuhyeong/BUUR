import {
  ADD_BASKET,
  DELETE_BEER,
  ADD_USERINFO,
  VACATE_BASKET
} from "./ActionTypes";


export const addBasket = basket => ({ 
  type: ADD_BASKET,
  payload: basket
});

export const deleteBeer = index => ({
  type: DELETE_BEER,
  payload: index
});

export const vacateBasket = index => ({
  type: VACATE_BASKET
});

export const addUserInfo = userInfo => ({
  type: ADD_USERINFO,
  payload: userInfo
});

