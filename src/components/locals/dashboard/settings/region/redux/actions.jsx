import {
  deleteRegionApi,
  getRegionApi,
  postRegionApi,
  updateRegionApi,
  updateRegionStatusApi,
} from "@/apis/dashboard";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getRegion = (data) => (dispatch) => {
  dispatch({ type: actions.GET_REGION_BEGIN });
  getRegionApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_REGION_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_REGION_ERROR });
    });
};

export const postRegion = (data, typeData, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_REGION_BEGIN });
  postRegionApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_REGION_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getRegion(typeData));
      successToast("Your message sent successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_REGION_ERROR });
    });
};

export const deleteRegion =
  (region_id, typeData, handleSuccess) => async (dispatch) => {
    dispatch({ type: actions.DELETE_REGION_BEGIN });

    try {
      await deleteRegionApi(region_id);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.DELETE_REGION_SUCCESS,
      });
      dispatch(getRegion(typeData));
      successToast("Banner has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_REGION_ERROR });
      errorToast(error);
    }
  };

export const updateRegion =
  (region_id, data, typeData, handleSuccess) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_REGION_BEGIN });

    try {
      await updateRegionApi(region_id, data);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.UPDATE_REGION_SUCCESS,
      });
      dispatch(getRegion(typeData));
      successToast("Banner has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_REGION_ERROR });
      errorToast(error);
    }
  };

export const updateRegionStatus =
  (data, typeData, handleSuccess) => (dispatch) => {
    dispatch({ type: actions.UPDATE_REGION_STATUS_BEGIN });
    updateRegionStatusApi(data)
      .then((res) => {
        dispatch({ type: actions.UPDATE_REGION_STATUS_SUCCESS });
        handleSuccess && handleSuccess();
        successToast("Status Updated Successfully");
        dispatch(getRegion(typeData));
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_REGION_STATUS_ERROR });
        errorToast(error);
      });
  };
