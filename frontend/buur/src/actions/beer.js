import {
  ADD_BASKET,
  DELETE_BEER,
  ADD_USERINFO
} from "./ActionTypes";


export const addBasket = basket => ({ 
  type: ADD_BASKET,
  payload: basket
});

export const addUserInfo = userInfo => ({
  type: ADD_USERINFO,
  payload: userInfo
});

export const deleteBeer = index => ({
  type: DELETE_BEER,
  payload: index
});