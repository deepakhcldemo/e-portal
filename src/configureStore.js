import { createStore, applyMiddleware } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { reducer as toastr } from 'react-redux-toastr';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import eventReducer from './views/Events/eventReducer'
import pdfViewerReducer from './components/pdfViewer/reducer';
import loginReducer from './views/Login/reducer';
import spinnerStatusReducer from './spinnerStore/reducer';
import curriculumReducer from './views/Curriculum/reducer';
import categoryReducer from './views/Category/reducer';
import carouselReducer from './components/carousel/reducer';
import modalReducer  from './shared/components/modalpopup/modalReducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['toastr', 'classes', 'login', 'pdfViewer']
  // debug: true,
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  category: categoryReducer,
  curriculum: curriculumReducer,
  pdfViewer: pdfViewerReducer,
  login: loginReducer,
  event : eventReducer,
  toastr,
  spinnerStatus: spinnerStatusReducer,
  carouselStore: carouselReducer,
  modalReducer : modalReducer
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
