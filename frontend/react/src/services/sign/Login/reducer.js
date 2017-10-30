import _ from 'lodash';
import { SET_CURRENT_USER } from '../../../actions/actionType/index';

const initState = {
  isAuthenticated: false,
  user: {}
};


// current user változtatása, kijelentkezetni is itt lehet
export default function reducer(state = initState, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: (!_.isEmpty(action.user)),
        user: action.user
      };
    }

    default:
      return state;
  }
}
