import {
  changeDownloadStatusApi,
  deleteDownloadApi,
  getDownloadApi,
  getPublicDownloadApi,
  postDownloadApi,
  updateDownloadApi,
} from "@/apis/dashboard/downloads";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getPublicDownload =
  ({ downloadable_type, downloadable_id }) =>
  (dispatch) => {
    dispatch({ type: actions.GET_DOWNLOAD_BEGIN });
    getPublicDownloadApi({ downloadable_type, downloadable_id })
      .then((res) => {
        dispatch({ type: actions.GET_DOWNLOAD_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        errorToast(error);
        dispatch({ type: actions.GET_DOWNLOAD_ERROR });
      });
  };

export const getPublicSingleDownload = (slug) => (dispatch) => {
  dispatch({ type: actions.GET_SINGLE_DOWNLOAD_BEGIN });
  getPublicDownloadApi(slug)
    .then((res) => {
      dispatch({
        type: actions.GET_SINGLE_DOWNLOAD_SUCCESS,
        payload: res?.data?.data[0],
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_SINGLE_DOWNLOAD_ERROR });
    });
};

export const getDownload = (data, typeData) => (dispatch) => {
  dispatch({ type: actions.GET_DOWNLOAD_BEGIN });
  getDownloadApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_DOWNLOAD_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_DOWNLOAD_ERROR });
    });
};

export const postDownload = (data, handleSuccess, typeData) => (dispatch) => {
  dispatch({ type: actions.POST_DOWNLOAD_BEGIN });
  postDownloadApi(data, typeData)
    .then((res) => {
      dispatch({ type: actions.POST_DOWNLOAD_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getDownload(typeData));
      successToast("Your message sent successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_DOWNLOAD_ERROR });
    });
};

export const deleteDownload =
  (Data, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_DOWNLOAD_BEGIN });

    try {
      await deleteDownloadApi(Data);
      dispatch({
        type: actions.DELETE_DOWNLOAD_SUCCESS,
        payload: "",
      });
      dispatch(getDownload(typeData));
      handleSuccess && handleSuccess();
      successToast("Download has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_DOWNLOAD_ERROR });
      errorToast(error);
    }
  };

export const updateDownload =
  (Data, slug, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_DOWNLOAD_BEGIN });
    try {
      await updateDownloadApi(Data, slug);
      dispatch({
        type: actions.UPDATE_DOWNLOAD_SUCCESS,
        payload: "",
      });
      dispatch(getDownload(typeData));
      handleSuccess && handleSuccess();
      successToast("Download has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_DOWNLOAD_ERROR });
      errorToast(error);
    }
  };

export const changeDownloadStatus =
  (data, handleSuccess, typeData) => (dispatch) => {
    dispatch({ type: actions.CHANGE_DOWNLOAD_STATUS_BEGIN });
    changeDownloadStatusApi(data)
      .then((res) => {
        dispatch({ type: actions.CHANGE_DOWNLOAD_STATUS_SUCCESS });
        handleSuccess && handleSuccess();
        dispatch(getDownload(typeData));
        successToast("Status has been changed");
      })
      .catch((error) => {
        errorToast(error);
        dispatch({ type: actions.CHANGE_DOWNLOAD_STATUS_ERROR });
      });
  };

export const setDownloadSearch = (data) => (dispatch) => {
  dispatch({ type: actions.SEARCH_DOWNLOAD, payload: data });
};
