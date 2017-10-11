import {
  DUMMY1_FETCH_SUCCESS,
  DUMMY1_REMOVE_ELEMENT,
  FETCH_SECRET_USERS_SUCCESS
} from '../actions/actionType';


// meg kell adni mindig egy init állapotot a reducernek
const initState = {
  users: [],
  lastDeletedUser: {},
  secretUsers: []
};

// a megfelelő action-re reagáljon, de a store többi részéhez ne nyúlj!!!!
// mert debuggolhatatlan lesz
export default function reducer(state = initState, action) {
  switch (action.type) {
    case DUMMY1_FETCH_SUCCESS: {
      return { ...state, users: action.payload };
    }

    case DUMMY1_REMOVE_ELEMENT: {
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.user.id),
        lastDeletedUser: action.payload.user
      };
    }

    case FETCH_SECRET_USERS_SUCCESS: {
      return {
        ...state,
        secretUsers: action.payload
      };
    }


    default:
      return state;
  }
}

