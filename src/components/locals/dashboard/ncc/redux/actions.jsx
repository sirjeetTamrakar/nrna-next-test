import {
  changeNCCStatusApi,
  deleteNCCApi,
  getCountriesApi,
  getNCCApi,
  postNCCApi,
  updateNCCApi,
} from "@/apis/dashboard";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getNCC = (data) => (dispatch) => {
  dispatch({ type: actions.GET_NCC_BEGIN });
  getNCCApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_NCC_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_NCC_ERROR });
    });
};

export const postNCC = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_NCC_BEGIN });
  postNCCApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_NCC_SUCCESS });
      successToast("Your message sent successfully");
      handleSuccess && handleSuccess();
      dispatch(getNCC());
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_NCC_ERROR });
    });
};

export const deleteNCC =
  (Data, refetch = () => {}) =>
  async (dispatch) => {
    dispatch({ type: actions.DELETE_NCC_BEGIN });

    try {
      await deleteNCCApi(Data);
      refetch && refetch();
      dispatch({
        type: actions.DELETE_NCC_SUCCESS,
        payload: "",
      });
      successToast("NCC form has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_NCC_ERROR });
      errorToast(error);
    }
  };

export const updateNCC =
  (Data, slug, typeData, handleSuccess) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_NCC_BEGIN });

    try {
      await updateNCCApi(Data, slug);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.UPDATE_NCC_SUCCESS,
        payload: "",
      });
      dispatch(getNCC(typeData));

      successToast("NCC form has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_NCC_ERROR });
      errorToast(error);
    }
  };

// get counties list
export const getCountries = () => (dispatch) => {
  dispatch({ type: actions.GET_COUNTRIES_LIST_BEGIN });
  getCountriesApi()
    .then((res) => {
      dispatch({
        type: actions.GET_COUNTRIES_LIST_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_COUNTRIES_LIST_ERROR });
    });
};

export const changeNCCStatus = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.CHANGE_NCC_STATUS_BEGIN });
  changeNCCStatusApi(data)
    .then((res) => {
      dispatch({ type: actions.CHANGE_NCC_STATUS_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getNCC());
      successToast("Status has been changed");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.CHANGE_NCC_STATUS_ERROR });
    });
};
