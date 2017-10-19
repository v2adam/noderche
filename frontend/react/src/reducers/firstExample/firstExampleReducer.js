import { SAVE_SEARCH_HISTORY } from '../../actions/actionType/index';


const initState = {
  lastSearchedAddress: {}
};


export default function reducer(state = initState, action) {
  switch (action.type) {
    case SAVE_SEARCH_HISTORY: {
      return { ...state, lastSearchedAddress: action.payload };
    }

    default:
      return state;
  }
}

