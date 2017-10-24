import {
  DELETE_POST,
  DELETE_SEARCH_HISTORY,
  FETCH_MY_COMMENTS,
  LIST_SEARCH_HISTORY,
  SAVE_SEARCH_HISTORY,
} from '../../actions/actionType/index';


const initState = {
  lastSearchedAddress: {},
  historyAddress: [],
  myComments: []
};


export default function reducer(state = initState, action) {
  switch (action.type) {
    // keresési előzmény mentése
    case SAVE_SEARCH_HISTORY: {
      return { ...state, lastSearchedAddress: action.payload };
    }

    // keresési előzmény listázása
    case LIST_SEARCH_HISTORY: {
      return { ...state, historyAddress: action.payload };
    }

    // keresési előzmény törlése
    case DELETE_SEARCH_HISTORY: {
      return {
        ...state,
        historyAddress: state.historyAddress
          .filter(one => one._id !== action.payload.id)
      };
    }

    // post-jaim listázása
    case FETCH_MY_COMMENTS: {
      return { ...state, myComments: action.payload };
    }


    // keresési előzmény törlése
    case DELETE_POST: {
      return {
        ...state,
        myComments: state.myComments
          .filter(one => one._id !== action.payload.id)
      };
    }


    default:
      return state;
  }
}

