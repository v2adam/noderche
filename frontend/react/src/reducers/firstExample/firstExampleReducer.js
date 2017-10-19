import { LIST_SEARCH_HISTORY, SAVE_SEARCH_HISTORY } from '../../actions/actionType/index';


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

    default:
      return state;
  }
}

