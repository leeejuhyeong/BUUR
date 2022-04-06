import * as type from "../actions/ActionTypes";

const userState = {
  users: [],
  signUpResult: null,
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    default:
      return state;

    case type.USER_SIGN_UP_RESULT:
      return { ...state, signUpResult: action.result };
  }
};

export default userReducer;
