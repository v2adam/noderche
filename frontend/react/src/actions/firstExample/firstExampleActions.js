import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  LIST_SEARCH_HISTORY,
  LIST_SEARCH_HISTORY_FAIL,
  SAVE_SEARCH_HISTORY,
  SAVE_SEARCH_HISTORY_FAIL
} from '../actionType/index';


// lementem a DB-be a keresési előzményeket
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


export function listHistorySearch() {
  return (dispatch) => {
    dispatch(showLoading());

    const opt = {
      mode: 'CORS',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.get('/api/v1/first/list', opt)
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


/*
export function listHistorySearch(data) {
  return (dispatch) => {

  };
}
*/
