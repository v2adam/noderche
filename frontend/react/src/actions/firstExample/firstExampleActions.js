import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  DELETE_SEARCH_HISTORY,
  DELETE_SEARCH_HISTORY_FAIL,
  FETCH_MY_COMMENTS,
  FETCH_MY_COMMENTS_FAIL,
  LIST_SEARCH_HISTORY,
  LIST_SEARCH_HISTORY_FAIL,
  SAVE_SEARCH_HISTORY,
  SAVE_SEARCH_HISTORY_FAIL
} from '../actionType/index';


// mentés db-be
export function saveHistorySearch(data) {
  return (dispatch) => {
    dispatch(showLoading());

    const opt = {
      mode: 'CORS',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.post('/api/v1/first/save', JSON.stringify(data), opt)
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

// adatok letöltése
export function listHistorySearch() {
  return (dispatch) => {
    dispatch(showLoading());

    axios.get('/api/v1/first/list')
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


// törlés a megadott id alapján
export function deleteHistorySearch(id) {
  return (dispatch) => {
    dispatch(showLoading());

    axios.delete(`/api/v1/first/delete/${id}`)
      .then((resp) => {
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

// törlés a megadott id alapján
export function listPosts() {
  return (dispatch) => {
    dispatch(showLoading());

    axios.get('/api/v1/first/listPosts')
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
