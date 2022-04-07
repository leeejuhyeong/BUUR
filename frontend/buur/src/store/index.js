// import { createStore, applyMiddleware } from "redux";
import { createStore } from "redux";
import rootReducer from "../reducers/index";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// const store = createStore(rootReducer, applyMiddleware(logger, thunk));
const store = createStore(rootReducer);

export default store;
