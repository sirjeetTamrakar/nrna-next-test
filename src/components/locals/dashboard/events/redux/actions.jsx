import {
  changeCategoryStatusApi,
  changeEventsStatusApi,
  deleteCategoryApi,
  deleteEventsApi,
  getCategoryApi,
  getEventsApi,
  postCategoryApi,
  postEventsApi,
  updateCategoryApi,
  updateEventsApi,
} from "@/apis/dashboard/events";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getEvents = (data) => (dispatch) => {
  dispatch({ type: actions.GET_EVENTS_BEGIN });
  getEventsApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_EVENTS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_EVENTS_ERROR });
    });
};

export const postEvents = (data, handleSuccess, typeData) => (dispatch) => {
  dispatch({ type: actions.POST_EVENTS_BEGIN });
  postEventsApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_EVENTS_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getEvents(typeData));
      successToast("Your message sent successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_EVENTS_ERROR });
    });
};

export const deleteEvents =
  (Data, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_EVENTS_BEGIN });

    try {
      await deleteEventsApi(Data);
      dispatch({
        type: actions.DELETE_EVENTS_SUCCESS,
        payload: "",
      });
      handleSuccess && handleSuccess();
      dispatch(getEvents(typeData));
      successToast("Event has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_EVENTS_ERROR });
      errorToast(error);
    }
  };

export const updateEvents =
  (Data, slug, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_EVENTS_BEGIN });

    try {
      await updateEventsApi(Data, slug);
      dispatch({
        type: actions.UPDATE_EVENTS_SUCCESS,
        payload: "",
      });
      handleSuccess && handleSuccess();
      dispatch(getEvents(typeData));
      successToast("Event has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_EVENTS_ERROR });
      errorToast(error);
    }
  };

export const changeEventsStatus =
  (data, handleSuccess, typeData) => (dispatch) => {
    dispatch({ type: actions.CHANGE_EVENTS_STATUS_BEGIN });
    changeEventsStatusApi(data)
      .then((res) => {
        dispatch({ type: actions.CHANGE_EVENTS_STATUS_SUCCESS });
        handleSuccess && handleSuccess();
        dispatch(getEvents(typeData));
        successToast("Status has been changed");
      })
      .catch((error) => {
        errorToast(error);
        dispatch({ type: actions.CHANGE_EVENTS_STATUS_ERROR });
      });
  };

export const getCategory = () => (dispatch) => {
  dispatch({ type: actions.GET_CATEGORY_BEGIN });
  getCategoryApi()
    .then((res) => {
      dispatch({ type: actions.GET_CATEGORY_SUCCESS, payload: res.data.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_CATEGORY_ERROR });
    });
};

export const postCategory = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_CATEGORY_BEGIN });
  postCategoryApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_CATEGORY_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getCategory());
      successToast("Category added successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_CATEGORY_ERROR });
    });
};

export const deleteCategory = (Data, handleSuccess) => async (dispatch) => {
  dispatch({ type: actions.DELETE_CATEGORY_BEGIN });

  try {
    await deleteCategoryApi(Data);
    dispatch({
      type: actions.DELETE_CATEGORY_SUCCESS,
      payload: "",
    });
    dispatch(getCategory());
    handleSuccess && handleSuccess();
    successToast("Category has been deleted");
  } catch (error) {
    dispatch({ type: actions.DELETE_CATEGORY_ERROR });
    errorToast(error);
  }
};

export const updateCategory =
  (Data, slug, handleSuccess) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_CATEGORY_BEGIN });

    try {
      await updateCategoryApi(Data, slug);
      dispatch({
        type: actions.UPDATE_CATEGORY_SUCCESS,
        payload: "",
      });
      dispatch(getCategory());
      handleSuccess && handleSuccess();
      successToast("Category has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_CATEGORY_ERROR });
      errorToast(error);
    }
  };

export const changeCategoryStatus = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.CHANGE_CATEGORY_STATUS_BEGIN });
  changeCategoryStatusApi(data)
    .then((res) => {
      dispatch({ type: actions.CHANGE_CATEGORY_STATUS_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getCategory());
      successToast("Status has been changed");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.CHANGE_CATEGORY_STATUS_ERROR });
    });
};
