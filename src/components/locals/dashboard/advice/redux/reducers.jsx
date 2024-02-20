import * as actions from './types';
const defaultState = {
  get_advice_loading: false,
  adviceData: [],
  delete_advice_loading: false
};

const adviceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.GET_ADVICE_BEGIN:
      return {
        ...state,
        get_advice_loading: true
      };

    case actions.GET_ADVICE_SUCCESS:
      return { ...state, get_advice_loading: false, adviceData: action.payload };

    case actions.GET_ADVICE_ERROR:
      return { ...state, get_advice_loading: false };

    case actions.DELETE_ADVICE_BEGIN:
      return { ...state, delete_advice_loading: true };

    case actions.DELETE_ADVICE_SUCCESS:
    case actions.DELETE_ADVICE_ERROR:
      return { ...state, delete_advice_loading: false };

    default:
      return state;
  }
};

export default adviceReducer;
