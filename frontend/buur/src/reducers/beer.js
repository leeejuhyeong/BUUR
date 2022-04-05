import * as type from "../actions/ActionTypes";

const beerState = {
  basket: [],
  userInfo: {},
};

const beer = (state = beerState, action = {}) => {
  switch (action.type) {
    case type.ADD_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.data]
      };
    
    case type.ADD_USERINFO:
      return {
        ...state,
        userInfo: { ...action.data }
      }
    
    case type.DELETE_BEER:
      return {
        ...state,
        basket: state.basket.filter((beer, index) => {
          return index !== action.data
        })
      };
    
    default:
      return state;
  }
};


export default beer;