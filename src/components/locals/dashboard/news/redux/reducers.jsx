import * as actions from './types';
const defaultState = {
  news_loading: false,
  get_news_loading: false,
  newsData: [],
  delete_news_loading: false,
  update_news_loading: false,
  news_status_loading: false,
  category_loading: false,
  get_category_loading: false,
  categoryData: [],
  delete_category_loading: false,
  update_category_loading: false,
  category_status_loading: false,
  news_order_loading: false,
  delete_news_order_loading: false,
  newsOrderData: [],
  get_news_order_loading: false,
  news_search: ''
};

const newsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_NEWS_BEGIN:
      return {
        ...state,
        news_loading: true
      };

    case actions.POST_NEWS_SUCCESS:
    case actions.POST_NEWS_ERROR:
      return { ...state, news_loading: false };

    case actions.GET_NEWS_BEGIN:
      return {
        ...state,
        get_news_loading: true
      };

    case actions.GET_NEWS_SUCCESS:
      return { ...state, get_news_loading: false, newsData: action.payload };

    case actions.GET_NEWS_ERROR:
      return { ...state, get_news_loading: false };

    case actions.DELETE_NEWS_BEGIN:
      return { ...state, delete_news_loading: true };

    case actions.DELETE_NEWS_SUCCESS:
    case actions.DELETE_NEWS_ERROR:
      return { ...state, delete_news_loading: false };

    case actions.UPDATE_NEWS_BEGIN:
      return { ...state, update_news_loading: true };

    case actions.UPDATE_NEWS_SUCCESS:
    case actions.UPDATE_NEWS_ERROR:
      return { ...state, update_news_loading: false };

    case actions.CHANGE_NEWS_STATUS_BEGIN:
      return {
        ...state,
        news_status_loading: true
      };

    case actions.CHANGE_NEWS_STATUS_SUCCESS:
    case actions.CHANGE_NEWS_STATUS_ERROR:
      return { ...state, news_status_loading: false };

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

    case actions.POST_NEWS_ORDER_BEGIN:
      return {
        ...state,
        news_order_loading: true
      };

    case actions.POST_NEWS_ORDER_SUCCESS:
    case actions.POST_NEWS_ORDER_ERROR:
      return { ...state, news_order_loading: false };

    case actions.DELETE_NEWS_ORDER_BEGIN:
      return { ...state, delete_news_order_loading: true };

    case actions.DELETE_NEWS_ORDER_SUCCESS:
    case actions.DELETE_NEWS_ORDER_ERROR:
      return { ...state, delete_news_order_loading: false };

    case actions.GET_NEWS_ORDER_BEGIN:
      return {
        ...state,
        get_news_order_loading: true
      };

    case actions.GET_NEWS_ORDER_SUCCESS:
      return { ...state, get_news_order_loading: false, newsOrderData: action.payload };

    case actions.GET_NEWS_ORDER_ERROR:
      return { ...state, get_news_order_loading: false };

    case actions.SEARCH_NEWS:
      return { ...state, news_search: action.payload };

    default:
      return state;
  }
};

export default newsReducer;
