import axios from 'axios';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import { push } from 'react-router-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import setAuthorizationToken from '../../../misc/setAuthorizationToken';
import store from '../../../store';
import { SET_CURRENT_USER, USER_LOGIN_FAIL, USER_LOGOUT } from '../../../actions/actionType/index';

// current user elmentése a store-ba
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

// bejelentkezés
export function loginUser(data) {
  return (dispatch) => {
    dispatch(showLoading());

    const opt = {
      mode: 'CORS',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log(data);

    axios.post('/api/v1/users/login', JSON.stringify(data), opt)
      .then((response) => {
        const token = response.data.token;
        // böngésző local storage-be rakja
        localStorage.setItem('jwtToken', token);

        // hozzáfűzöm az axioshoz
        setAuthorizationToken(token);

        // a megkapott token-t dekódolom, és kinyerem belőle a user adatokat,
        // és azt továbbadom egy action-nek, ami beállítja a store-ban
        dispatch(setCurrentUser(jwt.decode(token)));

        store.dispatch(push('/'));

        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch({ type: USER_LOGIN_FAIL, payload: err });

        store.dispatch(push('/'));

        dispatch(hideLoading());
      });
  };
}

// kijelentkezés
export function logoutUser() {
  return (dispatch) => {
    dispatch(showLoading());

    dispatch(setCurrentUser({}));
    setAuthorizationToken(false);
    localStorage.removeItem('jwtToken');

    dispatch({ type: USER_LOGOUT });

    store.dispatch(push('/'));

    dispatch(hideLoading());
  };
}
