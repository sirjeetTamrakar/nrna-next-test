import {
  changeDepartmentStatusApi,
  deleteDepartmentApi,
  getDepartmentApi,
  postDepartmentApi,
  updateDepartmentApi,
} from "@/apis/dashboard";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getDepartment = (data) => (dispatch) => {
  dispatch({ type: actions.GET_DEPARTMENT_BEGIN });
  getDepartmentApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_DEPARTMENT_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_DEPARTMENT_ERROR });
    });
};

export const postDepartment = (data, handleSuccess, typeData) => (dispatch) => {
  dispatch({ type: actions.POST_DEPARTMENT_BEGIN });
  postDepartmentApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_DEPARTMENT_SUCCESS });
      successToast("Team member added successfully");
      handleSuccess && handleSuccess();
      dispatch(getDepartment(typeData));
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_DEPARTMENT_ERROR });
    });
};

export const deleteDepartment =
  (Data, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_DEPARTMENT_BEGIN });

    try {
      await deleteDepartmentApi(Data);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.DELETE_DEPARTMENT_SUCCESS,
      });
      dispatch(getDepartment(typeData));
      successToast("Team member has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_DEPARTMENT_ERROR });
      errorToast(error);
    }
  };

export const updateDepartment =
  (Data, slug, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_DEPARTMENT_BEGIN });

    try {
      await updateDepartmentApi(Data, slug);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.UPDATE_DEPARTMENT_SUCCESS,
      });
      dispatch(getDepartment(typeData));
      successToast("Department has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_DEPARTMENT_ERROR });
      errorToast(error);
    }
  };

export const changeDepartmentStatus = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.CHANGE_DEPARTMENT_STATUS_BEGIN });
  changeDepartmentStatusApi(data)
    .then((res) => {
      dispatch({ type: actions.CHANGE_DEPARTMENT_STATUS_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getDepartment());
      successToast("Status has been changed");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.CHANGE_DEPARTMENT_STATUS_ERROR });
    });
};
