import * as type from "../actions/ActionTypes";

const reviewState = {
  setReview: [],
};

const review = (state = reviewState, action) => {
  switch (action.type) {
    case type.CHANGE_REVIEW:
      return {
        ...state,
        setReview: [...state.review, action.data],
      };

    default:
      return state;
  }
};

export default review;
