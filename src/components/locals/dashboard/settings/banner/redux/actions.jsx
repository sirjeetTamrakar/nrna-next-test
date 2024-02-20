import {
  deleteBannerApi,
  getBannerApi,
  postBannerApi,
  updateBannerApi,
  updateBannerStatusApi,
} from "@/apis/dashboard";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getBanner = (data) => (dispatch) => {
  dispatch({ type: actions.GET_BANNER_BEGIN });
  getBannerApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_BANNER_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_BANNER_ERROR });
    });
};

export const postBanner = (data, typeData, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_BANNER_BEGIN });
  postBannerApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_BANNER_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getBanner(typeData));
      successToast("Your message sent successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_BANNER_ERROR });
    });
};

export const deleteBanner = (banner_id, handleSuccess) => async (dispatch) => {
  dispatch({ type: actions.DELETE_BANNER_BEGIN });

  try {
    await deleteBannerApi(banner_id);
    handleSuccess && handleSuccess();
    dispatch({
      type: actions.DELETE_BANNER_SUCCESS,
    });
    dispatch(getBanner());
    successToast("Banner has been deleted");
  } catch (error) {
    dispatch({ type: actions.DELETE_BANNER_ERROR });
    errorToast(error);
  }
};

export const updateBanner =
  (banner_id, data, typeData, handleSuccess) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_BANNER_BEGIN });

    try {
      await updateBannerApi(banner_id, data);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.UPDATE_BANNER_SUCCESS,
      });
      dispatch(getBanner(typeData));
      successToast("Banner has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_BANNER_ERROR });
      errorToast(error);
    }
  };

export const updateBannerStatus =
  (banner_id, data, handleSuccess) => (dispatch) => {
    dispatch({ type: actions.UPDATE_BANNER_STATUS_BEGIN });
    updateBannerStatusApi(banner_id, data)
      .then((res) => {
        dispatch({ type: actions.UPDATE_BANNER_STATUS_SUCCESS });
        handleSuccess && handleSuccess();
        successToast("Status Updated Successfully");
        dispatch(getBanner());
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_BANNER_STATUS_ERROR });
        errorToast(error);
      });
  };
