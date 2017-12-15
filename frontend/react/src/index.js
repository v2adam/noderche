import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import history from './misc/history';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import App from './App';
import setAuthorizationToken from './misc/setAuthorizationToken';
import { setCurrentUser } from './services/sign/Login/actions';


// auth-token használata
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>
  </Provider>, document.getElementById('app'));


registerServiceWorker();
