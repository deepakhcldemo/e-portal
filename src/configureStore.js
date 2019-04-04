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
import { createBrowserHistory } from 'history';
import { routerMiddleware } from "react-router-redux";

import config from "./config/Config";
import classReducer from "./views/Classes/reducer";
import pdfViewerReducer from "./components/pdfViewer/reducer";
import loginReducer from "./views/Login/reducer";
import spinnerStatusReducer from "./spinnerStore/reducer";
import curriculumReducer from "./views/Curriculum/reducer";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["toastr", "classes", "login","pdfViewer"]
  // debug: true,
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  curriculum: curriculumReducer,
  classes: classReducer,
  pdfViewer: pdfViewerReducer,
  login: loginReducer,
  toastr,
  spinnerStatus: spinnerStatusReducer
});

const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, routerMiddleware(history))
);

persistStore(store);

export { history };
export default store;
