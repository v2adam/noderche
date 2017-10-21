import {
  DELETE_SEARCH_HISTORY,
  LIST_SEARCH_HISTORY,
  SAVE_SEARCH_HISTORY
} from '../../actions/actionType/index';


const initState = {
  lastSearchedAddress: {},
  historyAddress: []
};


export default function reducer(state = initState, action) {
  switch (action.type) {
    case SAVE_SEARCH_HISTORY: {
      return { ...state, lastSearchedAddress: action.payload };
    }

    case LIST_SEARCH_HISTORY: {
      return { ...state, historyAddress: action.payload };
    }

    // store-ból kidobom azt az id-t, amit már töröltem a DB-ből
    case DELETE_SEARCH_HISTORY: {
      return {
        ...state,
        historyAddress: state.historyAddress
          .filter(one => one._id !== action.payload.id)
      };
    }

    default:
      return state;
  }
}

