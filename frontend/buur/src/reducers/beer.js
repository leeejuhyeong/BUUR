import * as type from "../actions/ActionTypes";

const beerState = {
  basket: []
};

const beer = (state = beerState, action) => {
  switch (action.type) {
    case type.ADD_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.data]
      };

    default:
      return state;
  }
};


export default beer;