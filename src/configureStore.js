import { createStore, applyMiddleware } from "redux";
import {
  persistCombineReducers,
  persistReducer,
  persistStore
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { reducer as toastr } from "react-redux-toastr";
import thunk from "redux-thunk";
// import logger from 'redux-logger';
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

import config from "./config/config";
import classReducer from "./views/Classes/reducer";
import loginReducer from "./views/Login/reducer";
import spinnerStatusReducer from "./spinnerStore/reducer";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["toastr", "classes", "login"]
  // debug: true,
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  classes: classReducer,
  login: loginReducer,
  toastr,
  spinnerStatus: spinnerStatusReducer
});

const history = createHistory();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, routerMiddleware(history))
);

persistStore(store);

export { history };
export default store;
