import {
  deleteHomeDataApi,
  getHomeDataApi,
  getNbnsFollowersApi,
  getSiteSettingsApi,
  nbnsUserApprovalApi,
  postHomeDataApi,
  postSiteSettingsApi,
  updateHomeDataApi,
  updateHomeDataStatusApi,
} from "@/apis/dashboard";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getSiteSettings = (data) => (dispatch) => {
  dispatch({ type: actions.GET_SITE_SETTINGS_BEGIN });
  getSiteSettingsApi(data)
    .then((res) => {
      dispatch({
        type: actions.GET_SITE_SETTINGS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_SITE_SETTINGS_ERROR });
    });
};

export const postSiteSettings = (data, typeData) => (dispatch) => {
  dispatch({ type: actions.POST_SITE_SETTINGS_BEGIN });
  postSiteSettingsApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_SITE_SETTINGS_SUCCESS });
      successToast("Your message sent successfully");
      dispatch(getSiteSettings(typeData));
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_SITE_SETTINGS_ERROR });
    });
};

export const getHomeData = (data) => (dispatch) => {
  dispatch({ type: actions.GET_HOME_DATA_BEGIN });
  getHomeDataApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_HOME_DATA_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_HOME_DATA_ERROR });
    });
};

export const postHomeData = (data, typeData, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_HOME_DATA_BEGIN });
  postHomeDataApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_HOME_DATA_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getHomeData(typeData));
      successToast("Your message sent successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_HOME_DATA_ERROR });
    });
};

export const deleteHomeData =
  (banner_id, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_HOME_DATA_BEGIN });

    try {
      await deleteHomeDataApi(banner_id);
      dispatch({
        type: actions.DELETE_HOME_DATA_SUCCESS,
      });
      handleSuccess && handleSuccess();
      dispatch(getHomeData(typeData));
      successToast("Home data has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_HOME_DATA_ERROR });
      errorToast(error);
    }
  };

export const updateHomeData =
  (banner_id, data, typeData, handleSuccess) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_HOME_DATA_BEGIN });

    try {
      await updateHomeDataApi(banner_id, data);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.UPDATE_HOME_DATA_SUCCESS,
      });
      dispatch(getHomeData(typeData));
      successToast("Home data has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_HOME_DATA_ERROR });
      errorToast(error);
    }
  };

export const updateHomeDataStatus =
  (data, handleSuccess, typeData) => (dispatch) => {
    dispatch({ type: actions.UPDATE_HOME_DATA_STATUS_BEGIN });
    updateHomeDataStatusApi(data)
      .then((res) => {
        dispatch({ type: actions.UPDATE_HOME_DATA_STATUS_SUCCESS });
        handleSuccess && handleSuccess();
        successToast("Status Updated Successfully");
        dispatch(getHomeData(typeData));
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_HOME_DATA_STATUS_ERROR });
        errorToast(error);
      });
  };

export const getNbnsFollowers = (data) => (dispatch) => {
  dispatch({ type: actions.GET_NBNS_FOLLOWERS_BEGIN });
  getNbnsFollowersApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_NBNS_FOLLOWERS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_NBNS_FOLLOWERS_ERROR });
    });
};

export const postNbnsUserApproval = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_NBNS_USER_APPROVAL_BEGIN });
  nbnsUserApprovalApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_NBNS_USER_APPROVAL_SUCCESS });
      handleSuccess && handleSuccess();
      successToast("Changed status successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_NBNS_USER_APPROVAL_ERROR });
    });
};
