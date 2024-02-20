import * as actions from './types';
const defaultState = {
  settings: null,
  settings_loading: false,
  nbns_settings: null,
  nbns_setting_loading: false,
  news: [],
  news_loading: false,
  single_news: null,
  single_news_loading: false,
  events: [],
  events_loading: false,
  single_event: null,
  single_event_loading: false,
  contact_loading: false,
  contact: [],
  banners: [],
  banner_loading: false,
  contact_delete_loading: false,
  teams: [],
  team_loading: false,
  candidates: [],
  candidate_loading: false,
  ncc: [],
  ncc_loading: false,
  department: [],
  department_loading: false,
  single_teams: null,
  single_teams_loading: false,
  continents: [],
  continent_loading: false,
  business: [],
  business_loading: false,
  single_business: null,
  single_business_loading: false,
  business_contact_loading: false,
  business_category: [],
  business_category_loading: false,
  news_category: [],
  news_category_loading: false,
  events_category: [],
  events_category_loading: false,
  single_ncc: null,
  single_ncc_loading: false,
  single_user: null,
  single_user_loading: false,
  teams_contact_loading: false,
  advice_loading: false,
  home_data: [],
  home_data_loading: false,
  single_home_data: null,
  single_home_data_loading: false,
  questions_loading: false,
  questions: [],
  survey_loading: false,
  survey: [],
  email_check_loading: false,
  details: {},
  countries_list_code: [],
  get_countries_list_code_loading: false,
  set_active: null,
  business_join_loading: false,
  get_business_follow_loading: false,
  businessFollowData: [],
  delete_business_follow_loading: false,
  nbns_join_loading: false,
  get_nbns_follow_loading: false,
  nbnsFollowData: [],
  delete_nbns_follow_loading: false,
  business_create_account_loading: false,
  regions: [],
  regions_loading: false,
  gallery_loading: false,
  gallery: [],
  article_loading: false,
  article: [],
  press_release_loading: false,
  press_release: [],
  single_article: null,
  single_article_loading: false,
  single_press_release: null,
  single_press_release_loading: false
};

const homepageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.FETCH_SITE_SETTING_BEGIN:
      return {
        ...state,
        settings_loading: true
      };

    case actions.FETCH_SITE_SETTING_SUCCESS:
      return { ...state, settings_loading: false, settings: action.payload };

    case actions.FETCH_SITE_SETTING_ERROR:
      return { ...state, settings_loading: false };

    case actions.FETCH_NEWS_BEGIN:
      return {
        ...state,
        news_loading: true
      };

    case actions.FETCH_NEWS_SUCCESS:
      return { ...state, news_loading: false, news: action.payload };

    case actions.FETCH_NEWS_ERROR:
      return { ...state, news_loading: false };

    case actions.FETCH_EVENTS_BEGIN:
      return {
        ...state,
        events_loading: true
      };

    case actions.FETCH_EVENTS_SUCCESS:
      return { ...state, events_loading: false, events: action.payload };

    case actions.FETCH_EVENTS_ERROR:
      return { ...state, events_loading: false };

    case actions.POST_CONTACT_BEGIN:
      return {
        ...state,
        contact_loading: true
      };

    case actions.POST_CONTACT_SUCCESS:
    case actions.POST_CONTACT_ERROR:
      return { ...state, contact_loading: false };

    case actions.FETCH_SINGLE_EVENTS_BEGIN:
      return { ...state, single_event_loading: true };

    case actions.FETCH_SINGLE_EVENTS_SUCCESS:
      return { ...state, single_event_loading: false, single_event: action.payload };

    case actions.FETCH_SINGLE_EVENTS_ERROR:
      return { ...state, single_event_loading: false };

    case actions.FETCH_SINGLE_NEWS_BEGIN:
      return { ...state, single_news_loading: true };

    case actions.FETCH_SINGLE_NEWS_SUCCESS:
      return { ...state, single_news_loading: false, single_news: action.payload };

    case actions.FETCH_SINGLE_NEWS_ERROR:
      return { ...state, single_news_loading: false };

    case actions.FETCH_CONTACT_BEGIN:
      return {
        ...state,
        contact_loading: true
      };

    case actions.FETCH_CONTACT_SUCCESS:
      return { ...state, contact_loading: false, contact: action.payload };

    case actions.FETCH_CONTACT_ERROR:
      return { ...state, contact_loading: false };

    case actions.FETCH_BANNER_BEGIN:
      return { ...state, banner_loading: true, banners: [] };

    case actions.FETCH_BANNER_SUCCESS:
      return { ...state, banner_loading: false, banners: action.payload };

    case actions.FETCH_BANNER_ERROR:
      return { ...state, banner_loading: false };

    case actions.DELETE_CONTACT_BEGIN:
      return { ...state, contact_delete_loading: true };

    case actions.DELETE_CONTACT_SUCCESS:
    case actions.DELETE_CONTACT_ERROR:
      return { ...state, contact_delete_loading: false };

    case actions.FETCH_NCC_BEGIN:
      return { ...state, ncc_loading: true };

    case actions.FETCH_NCC_SUCCESS:
      return { ...state, ncc_loading: false, ncc: action.payload };

    case actions.FETCH_NCC_ERROR:
      return { ...state, ncc_loading: false };

    case actions.FETCH_OUR_TEAM_BEGIN:
      return { ...state, team_loading: true };

    case actions.FETCH_OUR_TEAM_SUCCESS:
      return { ...state, team_loading: false, teams: action.payload };

    case actions.FETCH_OUR_TEAM_ERROR:
      return { ...state, team_loading: false };

    case actions.FETCH_SINGLE_TEAMS_BEGIN:
      return { ...state, single_teams_loading: true };

    case actions.FETCH_SINGLE_TEAMS_SUCCESS:
      return { ...state, single_teams_loading: false, single_teams: action.payload };

    case actions.FETCH_SINGLE_TEAMS_ERROR:
      return { ...state, single_teams_loading: false };

    case actions.FETCH_CANDIDATE_BEGIN:
      return { ...state, candidate_loading: true };

    case actions.FETCH_CANDIDATE_SUCCESS:
      return { ...state, candidate_loading: false, candidates: action.payload };

    case actions.FETCH_CANDIDATE_ERROR:
      return { ...state, candidate_loading: false };

    case actions.FETCH_NBNS_SETTING_BEGIN:
      return { ...state, nbns_setting_loading: true };

    case actions.FETCH_NBNS_SETTING_SUCCESS:
      return { ...state, nbns_setting_loading: false, nbns_settings: action.payload };

    case actions.FETCH_NBNS_SETTING_ERROR:
      return { ...state, nbns_setting_loading: false };

    case actions.FETCH_DEPARTMENT_BEGIN:
      return { ...state, department_loading: true };

    case actions.FETCH_DEPARTMENT_SUCCESS:
      return { ...state, department_loading: false, department: action.payload };

    case actions.FETCH_DEPARTMENT_ERROR:
      return { ...state, department_loading: false };

    case actions.FETCH_BUSINESS_BEGIN:
      return {
        ...state,
        business_loading: true
      };

    case actions.FETCH_BUSINESS_SUCCESS:
      return { ...state, business_loading: false, business: action.payload };

    case actions.FETCH_BUSINESS_ERROR:
      return { ...state, business_loading: false };

    case actions.RESET_BUSINESS_STATE:
      return {
        ...state,
        business: null,
        business_loading: false
      };
    case actions.RESET_NEWS_STATE:
      return {
        ...state,
        news: null,
        news_loading: false
      };
    case actions.RESET_EVENTS_STATE:
      return {
        ...state,
        events: null,
        events_loading: false
      };

    case actions.FETCH_SINGLE_BUSINESS_BEGIN:
      return { ...state, single_business_loading: true };

    case actions.FETCH_SINGLE_BUSINESS_SUCCESS:
      return { ...state, single_business_loading: false, single_business: action.payload };

    case actions.FETCH_SINGLE_BUSINESS_ERROR:
      return { ...state, single_business_loading: false };

    case actions.POST_BUSINESS_CONTACT_BEGIN:
      return {
        ...state,
        business_contact_loading: true
      };

    case actions.POST_BUSINESS_CONTACT_SUCCESS:
    case actions.POST_BUSINESS_CONTACT_ERROR:
      return { ...state, business_contact_loading: false };

    case actions.FETCH_BUSINESS_CATEGORY_BEGIN:
      return { ...state, business_category_loading: true };

    case actions.FETCH_BUSINESS_CATEGORY_SUCCESS:
      return { ...state, business_category_loading: false, business_category: action.payload };

    case actions.FETCH_BUSINESS_CATEGORY_ERROR:
      return { ...state, business_category_loading: false };

    case actions.FETCH_NEWS_CATEGORY_BEGIN:
      return { ...state, news_category_loading: true };

    case actions.FETCH_NEWS_CATEGORY_SUCCESS:
      return { ...state, news_category_loading: false, news_category: action.payload };

    case actions.FETCH_NEWS_CATEGORY_ERROR:
      return { ...state, news_category_loading: false };

    case actions.FETCH_EVENTS_CATEGORY_BEGIN:
      return { ...state, events_category_loading: true };

    case actions.FETCH_EVENTS_CATEGORY_SUCCESS:
      return { ...state, events_category_loading: false, events_category: action.payload };

    case actions.FETCH_EVENTS_CATEGORY_ERROR:
      return { ...state, events_category_loading: false };

    case actions.FETCH_SINGLE_NCC_BEGIN:
      return { ...state, single_ncc_loading: true };

    case actions.FETCH_SINGLE_NCC_SUCCESS:
      return { ...state, single_ncc_loading: false, single_ncc: action.payload };

    case actions.FETCH_SINGLE_NCC_ERROR:
      return { ...state, single_ncc_loading: false };

    case actions.FETCH_SINGLE_USER_BEGIN:
      return { ...state, single_user_loading: true };

    case actions.FETCH_SINGLE_USER_SUCCESS:
      return { ...state, single_user_loading: false, single_user: action.payload };

    case actions.FETCH_SINGLE_USER_ERROR:
      return { ...state, single_user_loading: false };

    case actions.POST_TEAMS_CONTACT_BEGIN:
      return {
        ...state,
        teams_contact_loading: true
      };

    case actions.POST_TEAMS_CONTACT_SUCCESS:
    case actions.POST_TEAMS_CONTACT_ERROR:
      return { ...state, teams_contact_loading: false };

    case actions.POST_ADVICE_BEGIN:
      return {
        ...state,
        advice_loading: true
      };

    case actions.POST_ADVICE_SUCCESS:
    case actions.POST_ADVICE_ERROR:
      return { ...state, advice_loading: false };

    case actions.FETCH_HOME_DATA_BEGIN:
      return {
        ...state,
        home_data_loading: true
      };

    case actions.FETCH_HOME_DATA_SUCCESS:
      return { ...state, home_data_loading: false, home_data: action.payload };

    case actions.FETCH_HOME_DATA_ERROR:
      return { ...state, home_data_loading: false };

    case actions.FETCH_SINGLE_HOME_DATA_BEGIN:
      return { ...state, single_home_data_loading: true };

    case actions.FETCH_SINGLE_HOME_DATA_SUCCESS:
      return { ...state, single_home_data_loading: false, single_home_data: action.payload };

    case actions.FETCH_SINGLE_HOME_DATA_ERROR:
      return { ...state, single_home_data_loading: false };
    case actions.FETCH_QUESTIONS_BEGIN:
      return {
        ...state,
        questions_loading: true
      };

    case actions.FETCH_QUESTIONS_SUCCESS:
      return { ...state, questions_loading: false, questions: action.payload };

    case actions.FETCH_QUESTIONS_ERROR:
      return { ...state, questions_loading: false };

    case actions.POST_EMAIL_CHECK_BEGIN:
      return {
        ...state,
        email_check_loading: true
      };

    case actions.POST_EMAIL_CHECK_SUCCESS:
    case actions.POST_EMAIL_CHECK_ERROR:
      return { ...state, email_check_loading: false };

    case actions.STORE_DETAILS:
      return { ...state, details: action.payload };

    case actions.FETCH_SURVEY_BEGIN:
      return {
        ...state,
        survey_loading: true
      };

    case actions.FETCH_SURVEY_SUCCESS:
      return { ...state, survey_loading: false, survey: action.payload };

    case actions.FETCH_SURVEY_ERROR:
      return { ...state, survey_loading: false };

    // get countries
    case actions.GET_COUNTRIES_LIST_CODE_BEGIN:
      return {
        ...state,
        get_countries_list_code_loading: true
      };

    case actions.GET_COUNTRIES_LIST_CODE_SUCCESS:
      return {
        ...state,
        get_countries_list_code_loading: false,
        countries_list_code: action.payload
      };

    case actions.GET_COUNTRIES_LIST_CODE_ERROR:
      return { ...state, get_countries_list_code_loading: false };

    case actions.SET_ACTIVE_LINK:
      return { ...state, set_active: action.payload };

    case actions.POST_BUSINESS_JOIN_BEGIN:
      return {
        ...state,
        business_join_loading: true
      };

    case actions.POST_BUSINESS_JOIN_SUCCESS:
    case actions.POST_BUSINESS_JOIN_ERROR:
      return { ...state, business_join_loading: false };

    case actions.GET_BUSINESS_FOLLOW_BEGIN:
      return {
        ...state,
        get_business_follow_loading: true
      };

    case actions.GET_BUSINESS_FOLLOW_SUCCESS:
      return { ...state, get_business_follow_loading: false, businessFollowData: action.payload };

    case actions.GET_BUSINESS_FOLLOW_ERROR:
      return { ...state, get_business_follow_loading: false };

    case actions.DELETE_BUSINESS_FOLLOW_BEGIN:
      return { ...state, delete_business_follow_loading: true };

    case actions.DELETE_BUSINESS_FOLLOW_SUCCESS:
    case actions.DELETE_BUSINESS_FOLLOW_ERROR:
      return { ...state, delete_business_follow_loading: false };

    case actions.POST_NBNS_JOIN_BEGIN:
      return {
        ...state,
        nbns_join_loading: true
      };

    case actions.POST_NBNS_JOIN_SUCCESS:
    case actions.POST_NBNS_JOIN_ERROR:
      return { ...state, nbns_join_loading: false };

    case actions.GET_NBNS_FOLLOW_BEGIN:
      return {
        ...state,
        get_nbns_follow_loading: true
      };

    case actions.GET_NBNS_FOLLOW_SUCCESS:
      return { ...state, get_nbns_follow_loading: false, nbnsFollowData: action.payload };

    case actions.GET_NBNS_FOLLOW_ERROR:
      return { ...state, get_nbns_follow_loading: false };

    case actions.DELETE_NBNS_FOLLOW_BEGIN:
      return { ...state, delete_nbns_follow_loading: true };

    case actions.DELETE_NBNS_FOLLOW_SUCCESS:
    case actions.DELETE_NBNS_FOLLOW_ERROR:
      return { ...state, delete_nbns_follow_loading: false };

    case actions.POST_BUSINESS_CREATE_ACCOUNT_BEGIN:
      return {
        ...state,
        business_create_account_loading: true
      };

    case actions.POST_BUSINESS_CREATE_ACCOUNT_SUCCESS:
    case actions.POST_BUSINESS_CREATE_ACCOUNT_ERROR:
      return { ...state, business_create_account_loading: false };

    case actions.FETCH_REGIONS_BEGIN:
      return {
        ...state,
        regions_loading: true
      };

    case actions.FETCH_REGIONS_SUCCESS:
      return { ...state, regions_loading: false, regions: action.payload };

    case actions.FETCH_REGIONS_ERROR:
      return { ...state, regions_loading: false };

    case actions.FETCH_GALLERY_BEGIN:
      return {
        ...state,
        gallery_loading: true
      };

    case actions.FETCH_GALLERY_SUCCESS:
      return { ...state, gallery_loading: false, gallery: action.payload };

    case actions.FETCH_GALLERY_ERROR:
      return { ...state, gallery_loading: false };

    case actions.FETCH_ARTICLE_BEGIN:
      return {
        ...state,
        article_loading: true
      };

    case actions.FETCH_ARTICLE_SUCCESS:
      return { ...state, article_loading: false, article: action.payload };

    case actions.FETCH_ARTICLE_ERROR:
      return { ...state, article_loading: false };

    case actions.FETCH_PRESS_RELEASE_BEGIN:
      return {
        ...state,
        press_release_loading: true
      };

    case actions.FETCH_PRESS_RELEASE_SUCCESS:
      return { ...state, press_release_loading: false, press_release: action.payload };

    case actions.FETCH_PRESS_RELEASE_ERROR:
      return { ...state, press_release_loading: false };

    case actions.FETCH_SINGLE_ARTICLE_BEGIN:
      return { ...state, single_article_loading: true };

    case actions.FETCH_SINGLE_ARTICLE_SUCCESS:
      return { ...state, single_article_loading: false, single_article: action.payload };

    case actions.FETCH_SINGLE_ARTICLE_ERROR:
      return { ...state, single_article_loading: false };

    case actions.FETCH_SINGLE_PRESS_RELEASE_BEGIN:
      return { ...state, single_press_release_loading: true };

    case actions.FETCH_SINGLE_PRESS_RELEASE_SUCCESS:
      return {
        ...state,
        single_press_release_loading: false,
        single_press_release: action.payload
      };

    case actions.FETCH_SINGLE_PRESS_RELEASE_ERROR:
      return { ...state, single_press_release_loading: false };

    default:
      return state;
  }
};

export default homepageReducer;
