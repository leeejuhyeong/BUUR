import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"

import beer from "./beer"
import user from "./user"


const persistConfig = {
  key: 'basket',
  storage,
  whitelist: ["beer"]
}

const rootReducer = combineReducers({
  beer : beer,
  user : user,

})

export default persistReducer(persistConfig, rootReducer);