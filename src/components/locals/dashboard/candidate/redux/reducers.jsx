import * as actions from './types';
const defaultState = {
  candidate_loading: false,
  get_candidate_loading: false,
  candidateData: [],
  delete_candidate_loading: false,
  update_candidate_loading: false,
  candidate_status_loading: false
};

const candidateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_CANDIDATE_BEGIN:
      return {
        ...state,
        candidate_loading: true
      };

    case actions.POST_CANDIDATE_SUCCESS:
    case actions.POST_CANDIDATE_ERROR:
      return { ...state, candidate_loading: false };

    case actions.GET_CANDIDATE_BEGIN:
      return {
        ...state,
        get_candidate_loading: true
      };

    case actions.GET_CANDIDATE_SUCCESS:
      return { ...state, get_candidate_loading: false, candidateData: action.payload };

    case actions.GET_CANDIDATE_ERROR:
      return { ...state, get_candidate_loading: false };

    case actions.DELETE_CANDIDATE_BEGIN:
      return { ...state, delete_candidate_loading: true };

    case actions.DELETE_CANDIDATE_SUCCESS:
    case actions.DELETE_CANDIDATE_ERROR:
      return { ...state, delete_candidate_loading: false };

    case actions.UPDATE_CANDIDATE_BEGIN:
      return { ...state, update_candidate_loading: true };

    case actions.UPDATE_CANDIDATE_SUCCESS:
    case actions.UPDATE_CANDIDATE_ERROR:
      return { ...state, update_candidate_loading: false };

    case actions.CHANGE_CANDIDATE_STATUS_BEGIN:
      return {
        ...state,
        candidate_status_loading: true
      };

    case actions.CHANGE_CANDIDATE_STATUS_SUCCESS:
    case actions.CHANGE_CANDIDATE_STATUS_ERROR:
      return { ...state, candidate_status_loading: false };

    default:
      return state;
  }
};

export default candidateReducer;
