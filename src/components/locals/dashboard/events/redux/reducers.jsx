import * as actions from './types';
const defaultState = {
  events_loading: false,
  get_events_loading: false,
  eventsData: [],
  update_events_loading: false,
  delete_events_loading: false,
  events_status_loading: false,
  category_loading: false,
  get_category_loading: false,
  categoryData: [],
  delete_category_loading: false,
  update_category_loading: false,
  category_status_loading: false
};

const eventsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_EVENTS_BEGIN:
      return {
        ...state,
        events_loading: true
      };

    case actions.POST_EVENTS_SUCCESS:
    case actions.POST_EVENTS_ERROR:
      return { ...state, events_loading: false };

    case actions.GET_EVENTS_BEGIN:
      return {
        ...state,
        get_events_loading: true
      };

    case actions.GET_EVENTS_SUCCESS:
      return { ...state, get_events_loading: false, eventsData: action.payload };

    case actions.GET_EVENTS_ERROR:
      return { ...state, get_events_loading: false };

    case actions.DELETE_EVENTS_BEGIN:
      return { ...state, delete_events_loading: true };

    case actions.DELETE_EVENTS_SUCCESS:
    case actions.DELETE_EVENTS_ERROR:
      return { ...state, delete_events_loading: false };

    case actions.UPDATE_EVENTS_BEGIN:
      return { ...state, update_events_loading: true };

    case actions.UPDATE_EVENTS_SUCCESS:
    case actions.UPDATE_EVENTS_ERROR:
      return { ...state, update_events_loading: false };

    case actions.CHANGE_EVENTS_STATUS_BEGIN:
      return {
        ...state,
        events_status_loading: true
      };

    case actions.CHANGE_EVENTS_STATUS_SUCCESS:
    case actions.CHANGE_EVENTS_STATUS_ERROR:
      return { ...state, events_status_loading: false };

    case actions.POST_CATEGORY_BEGIN:
      return {
        ...state,
        category_loading: true
      };

    case actions.POST_CATEGORY_SUCCESS:
    case actions.POST_CATEGORY_ERROR:
      return { ...state, category_loading: false };

    case actions.GET_CATEGORY_BEGIN:
      return {
        ...state,
        get_category_loading: true
      };

    case actions.GET_CATEGORY_SUCCESS:
      return { ...state, get_category_loading: false, categoryData: action.payload };

    case actions.GET_CATEGORY_ERROR:
      return { ...state, get_category_loading: false };

    case actions.DELETE_CATEGORY_BEGIN:
      return { ...state, delete_category_loading: true };

    case actions.DELETE_CATEGORY_SUCCESS:
    case actions.DELETE_CATEGORY_ERROR:
      return { ...state, delete_category_loading: false };

    case actions.UPDATE_CATEGORY_BEGIN:
      return { ...state, update_category_loading: true };

    case actions.UPDATE_CATEGORY_SUCCESS:
    case actions.UPDATE_CATEGORY_ERROR:
      return { ...state, update_category_loading: false };

    case actions.CHANGE_CATEGORY_STATUS_BEGIN:
      return {
        ...state,
        category_status_loading: true
      };

    case actions.CHANGE_CATEGORY_STATUS_SUCCESS:
    case actions.CHANGE_CATEGORY_STATUS_ERROR:
      return { ...state, category_status_loading: false };

    default:
      return state;
  }
};

export default eventsReducer;
