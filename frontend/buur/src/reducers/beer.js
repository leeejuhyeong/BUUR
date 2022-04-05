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
    
    case type.DELETE_BEER:
      return {
        ...state,
        basket: state.basket.filter((beer, index) => {
          return index !== action.data
        })
      };
    
    case type.VACATE_BASKET:
      return {
        ...state,
        basket: []
      };
    
    case type.ADD_USERINFO:
      return {
        ...state,
        userInfo: { ...action.data }
      }
    

    
    default:
      return state;
  }
};


export default beer;