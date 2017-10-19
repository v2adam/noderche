import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { routerReducer } from 'react-router-redux';

import userReducer from './userReducer';
import dummyDataSetReducer from './dummyDataSetReducer';
import authReducer from './authReducer';
import firstExampleReducer from './firstExample/firstExampleReducer';


// ez a combineReducer, ezt adom át a store-nak
// store-ból meghivatkozhatóak a dolgok,
// pl: lastDeletedUser kinyerhető a store.users.lastDeletedUser-ként

export default combineReducers({
  users: userReducer,
  usaZip: dummyDataSetReducer,
  currentUser: authReducer,
  firstExample: firstExampleReducer,
  // ezek itt a behúzott csomagoknak kellenek
  loadingBar: loadingBarReducer,
  router: routerReducer
});
