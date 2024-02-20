import * as actions from './types';
const defaultState = {
  gallery_loading: false,
  get_gallery_loading: false,
  galleryData: [],
  update_gallery_loading: false,
  delete_gallery_loading: false,
  gallery_status_loading: false,
  article_loading: false,
  get_article_loading: false,
  articleData: [],
  update_article_loading: false,
  delete_article_loading: false,
  article_status_loading: false,
  press_release_loading: false,
  get_press_release_loading: false,
  pressReleaseData: [],
  update_press_release_loading: false,
  delete_press_release_loading: false,
  press_release_status_loading: false
};

const nbnsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_GALLERY_BEGIN:
      return {
        ...state,
        gallery_loading: true
      };

    case actions.POST_GALLERY_SUCCESS:
    case actions.POST_GALLERY_ERROR:
      return { ...state, gallery_loading: false };

    case actions.GET_GALLERY_BEGIN:
      return {
        ...state,
        get_gallery_loading: true
      };

    case actions.GET_GALLERY_SUCCESS:
      return { ...state, get_gallery_loading: false, galleryData: action.payload };

    case actions.GET_GALLERY_ERROR:
      return { ...state, get_gallery_loading: false };

    case actions.DELETE_GALLERY_BEGIN:
      return { ...state, delete_gallery_loading: true };

    case actions.DELETE_GALLERY_SUCCESS:
    case actions.DELETE_GALLERY_ERROR:
      return { ...state, delete_gallery_loading: false };

    case actions.UPDATE_GALLERY_BEGIN:
      return { ...state, update_gallery_loading: true };

    case actions.UPDATE_GALLERY_SUCCESS:
    case actions.UPDATE_GALLERY_ERROR:
      return { ...state, update_gallery_loading: false };

    case actions.CHANGE_GALLERY_STATUS_BEGIN:
      return {
        ...state,
        gallery_status_loading: true
      };

    case actions.CHANGE_GALLERY_STATUS_SUCCESS:
    case actions.CHANGE_GALLERY_STATUS_ERROR:
      return { ...state, gallery_status_loading: false };

    case actions.POST_ARTICLE_BEGIN:
      return {
        ...state,
        article_loading: true
      };

    case actions.POST_ARTICLE_SUCCESS:
    case actions.POST_ARTICLE_ERROR:
      return { ...state, article_loading: false };

    case actions.GET_ARTICLE_BEGIN:
      return {
        ...state,
        get_article_loading: true
      };

    case actions.GET_ARTICLE_SUCCESS:
      return { ...state, get_article_loading: false, articleData: action.payload };

    case actions.GET_ARTICLE_ERROR:
      return { ...state, get_article_loading: false };

    case actions.DELETE_ARTICLE_BEGIN:
      return { ...state, delete_article_loading: true };

    case actions.DELETE_ARTICLE_SUCCESS:
    case actions.DELETE_ARTICLE_ERROR:
      return { ...state, delete_article_loading: false };

    case actions.UPDATE_ARTICLE_BEGIN:
      return { ...state, update_article_loading: true };

    case actions.UPDATE_ARTICLE_SUCCESS:
    case actions.UPDATE_ARTICLE_ERROR:
      return { ...state, update_article_loading: false };

    case actions.CHANGE_ARTICLE_STATUS_BEGIN:
      return {
        ...state,
        article_status_loading: true
      };

    case actions.CHANGE_ARTICLE_STATUS_SUCCESS:
    case actions.CHANGE_ARTICLE_STATUS_ERROR:
      return { ...state, article_status_loading: false };

    case actions.POST_PRESS_RELEASE_BEGIN:
      return {
        ...state,
        press_release_loading: true
      };

    case actions.POST_PRESS_RELEASE_SUCCESS:
    case actions.POST_PRESS_RELEASE_ERROR:
      return { ...state, press_release_loading: false };

    case actions.GET_PRESS_RELEASE_BEGIN:
      return {
        ...state,
        get_press_release_loading: true
      };

    case actions.GET_PRESS_RELEASE_SUCCESS:
      return { ...state, get_press_release_loading: false, pressReleaseData: action.payload };

    case actions.GET_PRESS_RELEASE_ERROR:
      return { ...state, get_press_release_loading: false };

    case actions.DELETE_PRESS_RELEASE_BEGIN:
      return { ...state, delete_press_release_loading: true };

    case actions.DELETE_PRESS_RELEASE_SUCCESS:
    case actions.DELETE_PRESS_RELEASE_ERROR:
      return { ...state, delete_press_release_loading: false };

    case actions.UPDATE_PRESS_RELEASE_BEGIN:
      return { ...state, update_press_release_loading: true };

    case actions.UPDATE_PRESS_RELEASE_SUCCESS:
    case actions.UPDATE_PRESS_RELEASE_ERROR:
      return { ...state, update_press_release_loading: false };

    case actions.CHANGE_PRESS_RELEASE_STATUS_BEGIN:
      return {
        ...state,
        press_release_status_loading: true
      };

    case actions.CHANGE_PRESS_RELEASE_STATUS_SUCCESS:
    case actions.CHANGE_PRESS_RELEASE_STATUS_ERROR:
      return { ...state, press_release_status_loading: false };

    default:
      return state;
  }
};

export default nbnsReducer;
