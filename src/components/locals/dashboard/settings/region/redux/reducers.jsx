import * as actions from './types';
const defaultState = {
  region_loading: false,
  get_region_loading: false,
  regionData: [],
  delete_region_loading: false,
  update_region_loading: false,
  region_status_loading: false
};

const regionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_REGION_BEGIN:
      return {
        ...state,
        region_loading: true
      };

    case actions.POST_REGION_SUCCESS:
    case actions.POST_REGION_ERROR:
      return { ...state, region_loading: false };

    case actions.GET_REGION_BEGIN:
      return {
        ...state,
        get_region_loading: true
      };

    case actions.GET_REGION_SUCCESS:
      return { ...state, get_region_loading: false, regionData: action.payload };

    case actions.GET_REGION_ERROR:
      return { ...state, get_region_loading: false };

    case actions.DELETE_REGION_BEGIN:
      return { ...state, delete_region_loading: true };

    case actions.DELETE_REGION_SUCCESS:
    case actions.DELETE_REGION_ERROR:
      return { ...state, delete_region_loading: false };

    case actions.UPDATE_REGION_BEGIN:
      return { ...state, update_region_loading: true };

    case actions.UPDATE_REGION_SUCCESS:
    case actions.UPDATE_REGION_ERROR:
      return { ...state, update_region_loading: false };

    case actions.UPDATE_REGION_STATUS_BEGIN:
      return { ...state, region_status_loading: true };

    case actions.UPDATE_REGION_STATUS_SUCCESS:
    case actions.UPDATE_REGION_STATUS_ERROR:
      return { ...state, region_status_loading: false };

    default:
      return state;
  }
};

export default regionReducer;
