import axios from 'axios';
import FileDownload from 'react-file-download';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

import {
  FETCH_SECRET_USERS_FAIL,
  FETCH_SECRET_USERS_SUCCESS,
  FETCH_USA_ZIP_FAIL,
  FETCH_USA_ZIP_SUCCESS
} from '../../actions/actionType/index';

export function fetchUsaZip() {
  return (dispatch) => {
    dispatch(showLoading());
    axios.get('/api/v1/dummy/usa_zip')
      .then((response) => {
        dispatch({ type: FETCH_USA_ZIP_SUCCESS, payload: { dataset: response.data } });
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch({ type: FETCH_USA_ZIP_FAIL, payload: err });
        dispatch(hideLoading());
      });
  };
}

// titkos userek lekérése
export function fetchSecretUsers() {
  return (dispatch) => {
    dispatch(showLoading());
    axios.get('/api/v1/dummy/secretusers')
      .then((response) => {
        dispatch({ type: FETCH_SECRET_USERS_SUCCESS, payload: response.data });
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch({ type: FETCH_SECRET_USERS_FAIL, payload: err });
        dispatch(hideLoading());
      });
  };
}

// DB -> JSON -> XLS -> USER
export function downloadXlsx() {
  return (dispatch) => {
    dispatch(showLoading());

    // jelezni kell, hogy milyen fájlt kérek vissza
    const opt = {
      headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: 'arraybuffer'
    };

    axios.get('/api/v1/dummy/createxls', opt)
      .then((response) => {
        dispatch(FileDownload(response.data, 'report.xlsx'));
        dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(`downloadXls: ${err}`);
        dispatch(hideLoading());
      });
  };
}
