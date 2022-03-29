import * as type from "../actions/action-types";

const initialState = {
  // user
  users: [],
  signUpResult: null,


  // basket
  basket: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    // user
    case type.USER_SIGN_UP_RESULT:
      return { ...state, signUpResult: action.result };

    // basket
    case type.ADD_BASKET:
      return { ...state, basket: [...state.basket, action.data]};
  }
};

export default rootReducer;