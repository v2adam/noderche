// az action-ök és a reducerekben használt switch-case-ek
// célszerű kiszervezni, mert átlátható így, hogy mikor mit történik

export const SET_CURRENT_USER = 'SET_CURRENT_USER'; // current user változtatása
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'; // ha nem sikerült a login
export const USER_LOGOUT = 'USER_LOGOUT'; // user kijelentkezett


export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'; // sikeres regisztráció
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'; // sikertelen regisztráció


export const FETCH_USA_ZIP_SUCCESS = 'FETCH_USA_ZIP_SUCCESS';
export const FETCH_USA_ZIP_FAIL = 'FETCH_USA_ZIP_FAIL';


export const FETCH_SECRET_USERS_SUCCESS = 'FETCH_SECRET_USERS_SUCCESS';
export const FETCH_SECRET_USERS_FAIL = 'FETCH_SECRET_USERS_FAIL';


export const SAVE_SEARCH_HISTORY = 'SAVE_SEARCH_HISTORY'; // cím keresés naplózása
export const SAVE_SEARCH_HISTORY_FAIL = 'SAVE_SEARCH_HISTORY_FAIL'; // cím keresés naplózása hiba

export const DELETE_SEARCH_HISTORY = 'DELETE_SEARCH_HISTORY'; // cím törlése
export const DELETE_SEARCH_HISTORY_FAIL = 'DELETE_SEARCH_HISTORY_FAIL'; // cím törlése hiba

export const LIST_SEARCH_HISTORY = 'LIST_SEARCH_HISTORY'; // címek listázása
export const LIST_SEARCH_HISTORY_FAIL = 'LIST_SEARCH_HISTORY_FAIL'; // címek listázása hiba

export const FETCH_MY_COMMENTS = 'FETCH_MY_COMMENTS';
export const FETCH_MY_COMMENTS_FAIL = 'FETCH_MY_COMMENTS_FAIL';

export const ADD_POST = 'ADD_POST';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL';
