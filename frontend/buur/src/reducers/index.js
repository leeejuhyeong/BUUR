import * as type from "../actions/action-types";

const userStates = {
  users: [],
  signUpResult: null,
};

const userReducer = (state = userStates, action) => {
  switch (action.type) {
    case type.USER_SIGN_UP_RESULT:
      return { ...state, signUpResult: action.result };
    default:
      return state;
  }
};

export default userReducer;
