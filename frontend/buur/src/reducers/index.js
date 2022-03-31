import { combineReducers } from "redux";
import beer from "./beer"
import user from "./user"


const rootReducer = combineReducers({
  beer : beer,
  user : user,

})

export default rootReducer;