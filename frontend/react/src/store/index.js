import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers';


import history from '../misc/history';

// Build the middleware for intercepting and dispatching navigation actions
// ezzel elméletileg követhetőek a meglátogatott oldalak
const routerMW = routerMiddleware(history);

// összefűznia  middleware-ket
// ehhez olvasni kell egy kicsit, hogy mi mire jó
const middleware = applyMiddleware(routerMW, promise(), loadingBarMiddleware(), thunk, logger());

// store létrehozásához kell a combinedReducer + MW-k lánca kell
// a store-t az indexben használom, átadva a providernek
export default createStore(reducer, middleware);
