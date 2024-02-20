import {
  deleteBannerApi,
  getBannerApi,
  postBannerApi,
  updateBannerApi,
  updateBannerStatusApi,
} from "@/apis/dashboard";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getNBNSBanner = (data) => (dispatch) => {
  dispatch({ type: actions.GET_NBNS_BANNER_BEGIN });
  getBannerApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_NBNS_BANNER_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_NBNS_BANNER_ERROR });
    });
};

export const postNBNSBanner = (data, values, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_NBNS_BANNER_BEGIN });
  postBannerApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_NBNS_BANNER_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(
        getNBNSBanner({
          page: 1,
          pagination_limit: 10,
          bannerable_id: values?.bannerable_id,
          bannerable_type: values?.bannerable_type,
        })
      );
      successToast("Banner added successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_NBNS_BANNER_ERROR });
    });
};

export const deleteNBNSBanner =
  (banner_id, data, handleSuccess) => async (dispatch) => {
    dispatch({ type: actions.DELETE_NBNS_BANNER_BEGIN });

    try {
      await deleteBannerApi(banner_id);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.DELETE_NBNS_BANNER_SUCCESS,
      });
      dispatch(
        getNBNSBanner({
          page: 1,
          pagination_limit: 10,
          bannerable_id: data?.bannerable_id,
          bannerable_type: data?.bannerable_type,
        })
      );
      successToast("Banner has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_NBNS_BANNER_ERROR });
      errorToast(error);
    }
  };

export const updateNBNSBanner =
  (banner_id, data, values, handleSuccess) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_NBNS_BANNER_BEGIN });

    try {
      await updateBannerApi(banner_id, data);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.UPDATE_NBNS_BANNER_SUCCESS,
      });
      dispatch(
        getNBNSBanner({
          page: 1,
          pagination_limit: 10,
          bannerable_id: values?.bannerable_id,
          bannerable_type: values?.bannerable_type,
        })
      );
      successToast("Banner has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_NBNS_BANNER_ERROR });
      errorToast(error);
    }
  };

export const updateNBNSBannerStatus =
  (banner_id, data, values, handleSuccess) => (dispatch) => {
    dispatch({ type: actions.UPDATE_NBNS_BANNER_STATUS_BEGIN });
    updateBannerStatusApi(banner_id, data)
      .then((res) => {
        dispatch({ type: actions.UPDATE_NBNS_BANNER_STATUS_SUCCESS });
        handleSuccess && handleSuccess();
        successToast("Status Updated Successfully");
        dispatch(
          getNBNSBanner({
            page: 1,
            pagination_limit: 10,
            bannerable_id: values?.bannerable_id,
            bannerable_type: values?.bannerable_type,
          })
        );
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_NBNS_BANNER_STATUS_ERROR });
        errorToast(error);
      });
  };
