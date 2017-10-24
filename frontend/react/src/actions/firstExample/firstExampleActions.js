import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  ADD_POST,
  ADD_POST_FAIL,
  DELETE_POST,
  DELETE_POST_FAIL,
  DELETE_SEARCH_HISTORY,
  DELETE_SEARCH_HISTORY_FAIL,
  FETCH_MY_COMMENTS,
  FETCH_MY_COMMENTS_FAIL,
  LIST_SEARCH_HISTORY,
  LIST_SEARCH_HISTORY_FAIL,
  SAVE_SEARCH_HISTORY,
  SAVE_SEARCH_HISTORY_FAIL
} from '../actionType/index';


// keresési kulcsszó mentése
export function saveHistorySearch(data) {
  return (dispatch) => {
    dispatch(showLoading());

    const opt = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.post('/api/v1/first/history', JSON.stringify(data), opt)
      .then(() => {
        dispatch({ type: SAVE_SEARCH_HISTORY, payload: { data } });
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch({ type: SAVE_SEARCH_HISTORY_FAIL, payload: err });
        dispatch(hideLoading());
      });
  };
}

// keresési előzmény listázása
export function listHistorySearch() {
  return (dispatch) => {
    dispatch(showLoading());

    axios.get('/api/v1/first/history')
      .then((resp) => {
        dispatch({ type: LIST_SEARCH_HISTORY, payload: resp.data });
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch({ type: LIST_SEARCH_HISTORY_FAIL, payload: err });
        dispatch(hideLoading());
      });
  };
}


// megadott keresési előzmény törlése
export function deleteHistorySearch(id) {
  return (dispatch) => {
    dispatch(showLoading());

    axios.delete(`/api/v1/first/history/${id}`)
      .then((resp) => {
        // a sikeres törlés kódja a 204
        if (resp.status === 204) {
          dispatch({ type: DELETE_SEARCH_HISTORY, payload: { id } });
        } else {
          dispatch({ type: DELETE_SEARCH_HISTORY_FAIL, payload: resp.status });
        }
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch({ type: DELETE_SEARCH_HISTORY_FAIL, payload: err });
        dispatch(hideLoading());
      });
  };
}

// saját postok listázása
export function listPosts() {
  return (dispatch) => {
    dispatch(showLoading());

    axios.get('/api/v1/first/posts')
      .then((resp) => {
        dispatch({ type: FETCH_MY_COMMENTS, payload: resp.data });
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch({ type: FETCH_MY_COMMENTS_FAIL, payload: err });
        dispatch(hideLoading());
      });
  };
}


export function addPost(data) {
  return (dispatch) => {
    dispatch(showLoading());

    axios.post('/api/v1/first/posts', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
      .then((resp) => {
        dispatch({ type: ADD_POST, payload: resp.data });
        dispatch(listPosts());
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch({ type: ADD_POST_FAIL, payload: err });
        dispatch(hideLoading());
      });
  };
}


// megadott keresési előzmény törlése
export function deletePost(id) {
  return (dispatch) => {
    dispatch(showLoading());

    axios.delete(`/api/v1/first/posts/${id}`)
      .then((resp) => {
        // a sikeres törlés kódja a 204
        if (resp.status === 204) {
          dispatch({ type: DELETE_POST, payload: { id } });
          dispatch(listPosts());
        } else {
          dispatch({ type: DELETE_POST_FAIL, payload: resp.status });
        }
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch({ type: DELETE_POST, payload: err });
        dispatch(hideLoading());
      });
  };
}