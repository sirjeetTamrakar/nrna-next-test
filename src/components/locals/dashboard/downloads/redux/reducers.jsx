import * as actions from './types';
const defaultState = {
  download_loading: false,
  get_download_loading: false,
  downloadData: [],
  delete_download_loading: false,
  update_download_loading: false,
  download_status_loading: false,
  download_search: '',
  singleDownloadData: '',
  single_download_loading: false
};

const downloadReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_DOWNLOAD_BEGIN:
      return {
        ...state,
        download_loading: true
      };

    case actions.POST_DOWNLOAD_SUCCESS:
    case actions.POST_DOWNLOAD_ERROR:
      return { ...state, download_loading: false };

    case actions.GET_DOWNLOAD_BEGIN:
      return {
        ...state,
        get_download_loading: true
      };

    case actions.GET_DOWNLOAD_SUCCESS:
      return { ...state, get_download_loading: false, downloadData: action.payload };

    case actions.GET_DOWNLOAD_ERROR:
      return { ...state, get_download_loading: false };

    case actions.DELETE_DOWNLOAD_BEGIN:
      return { ...state, delete_download_loading: true };

    case actions.DELETE_DOWNLOAD_SUCCESS:
    case actions.DELETE_DOWNLOAD_ERROR:
      return { ...state, delete_download_loading: false };

    case actions.UPDATE_DOWNLOAD_BEGIN:
      return { ...state, update_download_loading: true };

    case actions.UPDATE_DOWNLOAD_SUCCESS:
    case actions.UPDATE_DOWNLOAD_ERROR:
      return { ...state, update_download_loading: false };

    case actions.CHANGE_DOWNLOAD_STATUS_BEGIN:
      return {
        ...state,
        download_status_loading: true
      };

    case actions.CHANGE_DOWNLOAD_STATUS_SUCCESS:
    case actions.CHANGE_DOWNLOAD_STATUS_ERROR:
      return { ...state, download_status_loading: false };

    case actions.SEARCH_DOWNLOAD:
      return { ...state, download_search: action.payload };

    case actions.GET_SINGLE_DOWNLOAD_BEGIN:
      return { ...state, single_download_loading: true };

    case actions.GET_SINGLE_DOWNLOAD_SUCCESS:
      return { ...state, single_download_loading: false, singleDownloadData: action.payload };

    case actions.GET_SINGLE_DOWNLOAD_ERROR:
      return { ...state, single_download_loading: false };

    default:
      return state;
  }
};

export default downloadReducer;
