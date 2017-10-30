import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { loginUser } from '../Login/actions';
import { USER_REGISTER_FAIL } from '../../../actions/actionType/index';


// regisztrálás
export default function registerUser(data) {
  return (dispatch) => {
    dispatch(showLoading());

    const opt = {
      mode: 'CORS',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.post('/api/v1/users/register', JSON.stringify(data), opt)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loginUser(data));
        }
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch({ type: USER_REGISTER_FAIL, payload: err });
        dispatch(hideLoading());
      });
  };
}
