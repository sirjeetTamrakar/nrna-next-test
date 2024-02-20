import * as actions from './types';
const defaultState = {
  banner_loading: false,
  get_banner_loading: false,
  bannerData: [],
  delete_banner_loading: false,
  update_banner_loading: false,
  banner_status_loading: false
};

const bannerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_BANNER_BEGIN:
      return {
        ...state,
        banner_loading: true
      };

    case actions.POST_BANNER_SUCCESS:
    case actions.POST_BANNER_ERROR:
      return { ...state, banner_loading: false };

    case actions.GET_BANNER_BEGIN:
      return {
        ...state,
        get_banner_loading: true
      };

    case actions.GET_BANNER_SUCCESS:
      return { ...state, get_banner_loading: false, bannerData: action.payload };

    case actions.GET_BANNER_ERROR:
      return { ...state, get_banner_loading: false };

    case actions.DELETE_BANNER_BEGIN:
      return { ...state, delete_banner_loading: true };

    case actions.DELETE_BANNER_SUCCESS:
    case actions.DELETE_BANNER_ERROR:
      return { ...state, delete_banner_loading: false };

    case actions.UPDATE_BANNER_BEGIN:
      return { ...state, update_banner_loading: true };

    case actions.UPDATE_BANNER_SUCCESS:
    case actions.UPDATE_BANNER_ERROR:
      return { ...state, update_banner_loading: false };

    case actions.UPDATE_BANNER_STATUS_BEGIN:
      return { ...state, banner_status_loading: true };

    case actions.UPDATE_BANNER_STATUS_SUCCESS:
    case actions.UPDATE_BANNER_STATUS_ERROR:
      return { ...state, banner_status_loading: false };

    default:
      return state;
  }
};

export default bannerReducer;
