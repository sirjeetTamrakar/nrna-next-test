import {
  businessContactApi,
  businessJoinApi,
  contactUsApi,
  deleteBusinessFollowApi,
  deleteContactApi,
  deleteNbnsFollowApi,
  getAllEventsApi,
  getAllHomeDataApi,
  getAllNewsApi,
  getAllQuestionsApi,
  getAllSurveyApi,
  getArticlesApi,
  getBannerApi,
  getBusinessApi,
  getBusinessCategoryApi,
  getBusinessFollowApi,
  getCandidatesApi,
  getContactUsApi,
  getContinentsApi,
  getCountriesCodeApi,
  getDepartmentApi,
  getEventsCategoryApi,
  getGalleryApi,
  getNbnsFollowApi,
  getNccApi,
  getNewsCategoryApi,
  getPressReleaseApi,
  getRegionsApi,
  getSingleArticleApi,
  getSingleBusinessApi,
  getSingleEventApi,
  getSingleHomeDataApi,
  getSingleNCCApi,
  getSingleNewsApi,
  getSinglePressReleaseApi,
  getSingleTeamsApi,
  getSingleUserApi,
  getSiteSettingsApi,
  getTeamsApi,
  nbnsJoinApi,
  postAdviceApi,
  postBusinessCreateAccountApi,
  postCheckEmailApi,
  postTeamContactApi,
} from "@/apis/homepage";
import { getError } from "@/helpers";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getSiteSettings = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_SITE_SETTING_BEGIN });
  getSiteSettingsApi(data)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SITE_SETTING_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SITE_SETTING_ERROR });
    });
};

export const getNbnsSettings = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_NBNS_SETTING_BEGIN });
  getSiteSettingsApi(data)
    .then((res) => {
      dispatch({
        type: actions.FETCH_NBNS_SETTING_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_NBNS_SETTING_ERROR });
    });
};

export const getAllNews = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_NEWS_BEGIN });
  getAllNewsApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_NEWS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_NEWS_ERROR });
    });
};

export const getSingleNews = (slug) => (dispatch) => {
  dispatch({ type: actions.FETCH_SINGLE_NEWS_BEGIN });
  getSingleNewsApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SINGLE_NEWS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SINGLE_NEWS_ERROR });
    });
};

export const getAllEvents = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_EVENTS_BEGIN });
  getAllEventsApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_EVENTS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_EVENTS_ERROR });
    });
};

export const getSingleEvent = (slug) => (dispatch) => {
  dispatch({ type: actions.FETCH_SINGLE_EVENTS_BEGIN });
  getSingleEventApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SINGLE_EVENTS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SINGLE_EVENTS_ERROR });
    });
};

export const contactUs = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_CONTACT_BEGIN });
  contactUsApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_CONTACT_SUCCESS });
      successToast("Your message sent successfully");
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_CONTACT_ERROR });
    });
};

export const getContact = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_CONTACT_BEGIN });
  getContactUsApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_CONTACT_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_CONTACT_ERROR });
    });
};

export const getBanner = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_BANNER_BEGIN });
  getBannerApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_BANNER_SUCCESS, payload: res.data.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_BANNER_ERROR });
    });
};

export const deleteContact = (id, handleSuccess, typeData) => (dispatch) => {
  dispatch({ type: actions.DELETE_CONTACT_BEGIN });
  deleteContactApi(id)
    .then((res) => {
      dispatch({ type: actions.DELETE_CONTACT_SUCCESS });
      handleSuccess && handleSuccess();
      successToast("Contact deleted successfully");
      dispatch(getContact(typeData));
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.DELETE_CONTACT_ERROR });
    });
};

export const getTeams = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_OUR_TEAM_BEGIN });
  getTeamsApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_OUR_TEAM_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: actions.FETCH_OUR_TEAM_ERROR });
    });
};

export const getSingleTeams = (slug) => (dispatch) => {
  dispatch({ type: actions.FETCH_SINGLE_TEAMS_BEGIN });
  getSingleTeamsApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SINGLE_TEAMS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SINGLE_TEAMS_ERROR });
    });
};

export const getCandidates = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_CANDIDATE_BEGIN });
  getCandidatesApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_CANDIDATE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: actions.FETCH_CANDIDATE_ERROR });
    });
};

export const getNcc = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_NCC_BEGIN });
  getNccApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_NCC_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: actions.FETCH_NCC_ERROR });
    });
};

export const getDepartment = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_DEPARTMENT_BEGIN });
  getDepartmentApi(data)
    .then((res) => {
      dispatch({
        type: actions.FETCH_DEPARTMENT_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({ type: actions.FETCH_DEPARTMENT_ERROR });
    });
};

export const getContinents = () => (dispatch) => {
  dispatch({ type: actions.FETCH_CONTINENTS_BEGIN });
  getContinentsApi()
    .then((res) => {
      dispatch({ type: actions.FETCH_CONTACT_SUCCESS, payload: res.data.data });
    })
    .catch((err) => {
      dispatch({ type: actions.FETCH_CONTACT_ERROR });
    });
};

export const getBusiness = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_BUSINESS_BEGIN });
  getBusinessApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_BUSINESS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: actions.FETCH_BUSINESS_ERROR });
    });
};

export const resetBusinessState = () => (dispatch) => {
  dispatch({ type: actions.RESET_BUSINESS_STATE });
};
export const resetNewsState = () => (dispatch) => {
  dispatch({ type: actions.RESET_NEWS_STATE });
};
export const resetEventsState = () => (dispatch) => {
  dispatch({ type: actions.RESET_EVENTS_STATE });
};

export const getSingleBusiness = (slug) => (dispatch) => {
  dispatch({ type: actions.FETCH_SINGLE_BUSINESS_BEGIN });
  getSingleBusinessApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SINGLE_BUSINESS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SINGLE_BUSINESS_ERROR });
    });
};

export const postBusinessContact = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_BUSINESS_CONTACT_BEGIN });
  businessContactApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_BUSINESS_CONTACT_SUCCESS });
      successToast("Your message sent successfully");
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_BUSINESS_CONTACT_ERROR });
    });
};

export const getBusinessCategory = () => (dispatch) => {
  dispatch({ type: actions.FETCH_BUSINESS_CATEGORY_BEGIN });
  getBusinessCategoryApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_BUSINESS_CATEGORY_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({ type: actions.FETCH_BUSINESS_CATEGORY_ERROR });
    });
};

export const getNewsCategory = () => (dispatch) => {
  dispatch({ type: actions.FETCH_NEWS_CATEGORY_BEGIN });
  getNewsCategoryApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_NEWS_CATEGORY_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({ type: actions.FETCH_NEWS_CATEGORY_ERROR });
    });
};

export const getEventsCategory = () => (dispatch) => {
  dispatch({ type: actions.FETCH_EVENTS_CATEGORY_BEGIN });
  getEventsCategoryApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_EVENTS_CATEGORY_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({ type: actions.FETCH_EVENTS_CATEGORY_ERROR });
    });
};

export const getSingleNCC = (slug) => (dispatch) => {
  dispatch({ type: actions.FETCH_SINGLE_NCC_BEGIN });
  getSingleNCCApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SINGLE_NCC_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SINGLE_NCC_ERROR });
    });
};

export const getSingleUser = (slug) => (dispatch) => {
  dispatch({ type: actions.FETCH_SINGLE_USER_BEGIN });
  getSingleUserApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SINGLE_USER_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SINGLE_USER_ERROR });
    });
};

export const teamsContactUs = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_TEAMS_CONTACT_BEGIN });
  postTeamContactApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_TEAMS_CONTACT_SUCCESS });
      successToast("Your message sent successfully");
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_TEAMS_CONTACT_ERROR });
    });
};

export const postAdvice = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_ADVICE_BEGIN });
  postAdviceApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_ADVICE_SUCCESS });
      successToast("Your message sent successfully");
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_ADVICE_ERROR });
    });
};

export const getAllHomeData = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_HOME_DATA_BEGIN });
  getAllHomeDataApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_HOME_DATA_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_HOME_DATA_ERROR });
    });
};

export const getSingleHomeData = (slug) => (dispatch) => {
  dispatch({ type: actions.FETCH_SINGLE_HOME_DATA_BEGIN });
  getSingleHomeDataApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SINGLE_HOME_DATA_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SINGLE_HOME_DATA_ERROR });
    });
};

export const getAllQuestions = () => (dispatch) => {
  dispatch({ type: actions.FETCH_QUESTIONS_BEGIN });

  getAllQuestionsApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_QUESTIONS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_QUESTIONS_ERROR });
    });
};

export const emailCheck = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_EMAIL_CHECK_BEGIN });
  postCheckEmailApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_EMAIL_CHECK_SUCCESS });
      successToast("You cann take survey");
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      dispatch({ type: actions.POST_EMAIL_CHECK_ERROR });
      getError(error);
    });
};

export const saveDetails = (data) => (dispatch) => {
  dispatch({ type: actions.STORE_DETAILS, payload: data });
};

export const getAllSurvey = () => (dispatch) => {
  dispatch({ type: actions.FETCH_SURVEY_BEGIN });

  getAllSurveyApi()
    .then((res) => {
      dispatch({ type: actions.FETCH_SURVEY_SUCCESS, payload: res.data.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SURVEY_ERROR });
    });
};

// get counties list with code
export const getCountriesCode = () => (dispatch) => {
  dispatch({ type: actions.GET_COUNTRIES_LIST_CODE_BEGIN });
  getCountriesCodeApi()
    .then((res) => {
      dispatch({
        type: actions.GET_COUNTRIES_LIST_CODE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_COUNTRIES_LIST_CODE_ERROR });
    });
};

export const setActiveLink = (data) => (dispatch) => {
  dispatch({ type: actions.SET_ACTIVE_LINK, payload: data });
};

export const getBusinessFollow = (data) => (dispatch) => {
  dispatch({ type: actions.GET_BUSINESS_FOLLOW_BEGIN });
  getBusinessFollowApi(data)
    .then((res) => {
      dispatch({
        type: actions.GET_BUSINESS_FOLLOW_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_BUSINESS_FOLLOW_ERROR });
    });
};

export const postBusinessJoin =
  (data, fetchData, handleSuccess) => (dispatch) => {
    dispatch({ type: actions.POST_BUSINESS_JOIN_BEGIN });
    businessJoinApi(data)
      .then((res) => {
        dispatch({ type: actions.POST_BUSINESS_JOIN_SUCCESS });
        successToast("Following");
        dispatch(getBusinessFollow(fetchData));
        handleSuccess && handleSuccess();
      })
      .catch((error) => {
        errorToast(error);
        dispatch({ type: actions.POST_BUSINESS_JOIN_ERROR });
      });
  };

export const deleteBuisnessFollow = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.DELETE_BUSINESS_FOLLOW_BEGIN });
  deleteBusinessFollowApi(data)
    .then((res) => {
      dispatch({ type: actions.DELETE_BUSINESS_FOLLOW_SUCCESS });
      successToast("Unfollowing");
      dispatch(getBusinessFollow(data));
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.DELETE_BUSINESS_FOLLOW_ERROR });
    });
};

// nbns follow

export const getNBNSFollow = (data) => (dispatch) => {
  dispatch({ type: actions.GET_NBNS_FOLLOW_BEGIN });
  getNbnsFollowApi(data)
    .then((res) => {
      dispatch({
        type: actions.GET_NBNS_FOLLOW_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_NBNS_FOLLOW_ERROR });
    });
};

export const postNBNSJoin = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_NBNS_JOIN_BEGIN });
  nbnsJoinApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_NBNS_JOIN_SUCCESS });
      successToast("Following NBNS");
      dispatch(getNBNSFollow(data));
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_NBNS_JOIN_ERROR });
    });
};

export const deleteNBNSFollow = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.DELETE_NBNS_FOLLOW_BEGIN });
  deleteNbnsFollowApi(data)
    .then((res) => {
      dispatch({ type: actions.DELETE_NBNS_FOLLOW_SUCCESS });
      successToast("Unfollowing NBNS");
      dispatch(getNBNSFollow(data));
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.DELETE_NBNS_FOLLOW_ERROR });
    });
};

export const postBusinessCreateAccount =
  (data, handleSuccess) => (dispatch) => {
    dispatch({ type: actions.POST_BUSINESS_CREATE_ACCOUNT_BEGIN });
    postBusinessCreateAccountApi(data)
      .then((res) => {
        dispatch({ type: actions.POST_BUSINESS_CREATE_ACCOUNT_SUCCESS });
        successToast(
          "Created account. Please check you email for verification."
        );
        handleSuccess && handleSuccess();
      })
      .catch((error) => {
        errorToast(error);
        dispatch({ type: actions.POST_BUSINESS_CREATE_ACCOUNT_ERROR });
      });
  };

export const getAllRegions = () => (dispatch) => {
  dispatch({ type: actions.FETCH_REGIONS_BEGIN });

  getRegionsApi()
    .then((res) => {
      dispatch({ type: actions.FETCH_REGIONS_SUCCESS, payload: res.data.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_REGIONS_ERROR });
    });
};

export const getGallery = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_GALLERY_BEGIN });
  getGalleryApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_GALLERY_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_GALLERY_ERROR });
    });
};

export const getArticles = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_ARTICLE_BEGIN });
  getArticlesApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_ARTICLE_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_ARTICLE_ERROR });
    });
};

export const getPressRelease = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_PRESS_RELEASE_BEGIN });
  getPressReleaseApi(data)
    .then((res) => {
      dispatch({
        type: actions.FETCH_PRESS_RELEASE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_PRESS_RELEASE_ERROR });
    });
};

export const getSingleArticle = (slug) => (dispatch) => {
  dispatch({ type: actions.FETCH_SINGLE_ARTICLE_BEGIN });
  getSingleArticleApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SINGLE_ARTICLE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SINGLE_ARTICLE_ERROR });
    });
};

export const getSinglePressRelease = (slug) => (dispatch) => {
  dispatch({ type: actions.FETCH_SINGLE_PRESS_RELEASE_BEGIN });
  getSinglePressReleaseApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SINGLE_PRESS_RELEASE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SINGLE_PRESS_RELEASE_ERROR });
    });
};
