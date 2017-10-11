import { FETCH_USA_ZIP_SUCCESS } from '../actions/actionType/index';


const initState = {
  usaZip: {
    dataset: []
  }
};


export default function reducer(state = initState, action) {
  switch (action.type) {
    case FETCH_USA_ZIP_SUCCESS: {
      return { ...state, usaZip: { dataset: action.payload.dataset } };
    }

    default:
      return state;
  }
}

