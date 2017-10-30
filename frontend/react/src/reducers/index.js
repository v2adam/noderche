import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { routerReducer } from 'react-router-redux';

import userReducer from './userReducer';
import dummyDataSetReducer from './dummyDataSetReducer';
import authReducer from '../services/sign/Login/reducer';
import firstExampleReducer from './firstExample/firstExampleReducer';


export default combineReducers({
  users: userReducer,
  usaZip: dummyDataSetReducer,
  currentUser: authReducer,
  firstExample: firstExampleReducer,
  // ezek itt a behúzott csomagoknak kellenek
  loadingBar: loadingBarReducer,
  router: routerReducer
});
