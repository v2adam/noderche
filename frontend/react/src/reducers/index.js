import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { routerReducer } from 'react-router-redux';

import ManyExampleReducer from '../services/ManyExample/reducer';
import authReducer from '../services/sign/Login/reducer';
import firstExampleReducer from '../services/FirstComplexExample/reducer';


export default combineReducers({
  usaZip: ManyExampleReducer,
  currentUser: authReducer,
  firstExample: firstExampleReducer,
  // ezek itt a behúzott csomagoknak kellenek
  loadingBar: loadingBarReducer,
  router: routerReducer
});
