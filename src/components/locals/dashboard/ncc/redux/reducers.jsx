import * as actions from './types';
const defaultState = {
  ncc_loading: false,
  get_ncc_loading: false,
  get_country_list_loading: false,
  countries_list: [],
  nccData: [],
  delete_ncc_loading: false,
  update_ncc_loading: false,
  ncc_status_loading: false
};

const nccReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_NCC_BEGIN:
      return {
        ...state,
        ncc_loading: true
      };

    case actions.POST_NCC_SUCCESS:
    case actions.POST_NCC_ERROR:
      return { ...state, ncc_loading: false };

    case actions.GET_NCC_BEGIN:
      return {
        ...state,
        get_ncc_loading: true
      };

    case actions.GET_NCC_SUCCESS:
      return { ...state, get_ncc_loading: false, nccData: action.payload };

    case actions.GET_NCC_ERROR:
      return { ...state, get_ncc_loading: false };

    case actions.DELETE_NCC_BEGIN:
      return { ...state, delete_ncc_loading: true };

    case actions.DELETE_NCC_SUCCESS:
    case actions.DELETE_NCC_ERROR:
      return { ...state, delete_ncc_loading: false };

    case actions.UPDATE_NCC_BEGIN:
      return { ...state, update_ncc_loading: true };

    case actions.UPDATE_NCC_SUCCESS:
    case actions.UPDATE_NCC_ERROR:
      return { ...state, update_ncc_loading: false };

    // get countries
    case actions.GET_COUNTRIES_LIST_BEGIN:
      return {
        ...state,
        get_countries_list_loading: true
      };

    case actions.GET_COUNTRIES_LIST_SUCCESS:
      return { ...state, get_countries_list_loading: false, countries_list: action.payload };

    case actions.GET_COUNTRIES_LIST_ERROR:
      return { ...state, get_countries_list_loading: false };

    case actions.CHANGE_NCC_STATUS_BEGIN:
      return {
        ...state,
        ncc_status_loading: true
      };

    case actions.CHANGE_NCC_STATUS_SUCCESS:
    case actions.CHANGE_NCC_STATUS_ERROR:
      return { ...state, ncc_status_loading: false };

    default:
      return state;
  }
};

export default nccReducer;
