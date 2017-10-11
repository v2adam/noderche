import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import history from './misc/history';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import App from './App';
import setAuthorizationToken from "./misc/setAuthorizationToken";
import { setCurrentUser } from "./actions/authActions";

//olyan mint az angularban az app.module, ez fogja össze a dolgokat


// auth-token használata
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <App/>{/* a router-nek csak 1 child-ja lehet */}
    </ConnectedRouter>
  </Provider>, document.getElementById('app'));


// ezt nem tudom, hogy mi ?
// jött az inittel
registerServiceWorker();
