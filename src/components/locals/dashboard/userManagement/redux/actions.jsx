import { deleteUsersApi } from "@/apis/dashboard";
import {
  changeApprovalApi,
  changeStatusApi,
  changeUserRoleApi,
  createUserApi,
  getAllUsersApi,
  getAllUsersDownloadApi,
  updateProfileApi,
  updateUsersApi,
} from "@/apis/dashboard/user";
import { updateGlobalUser } from "@/redux/auth/actions";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getAllUsers = (data, roleData) => (dispatch) => {
  dispatch({ type: actions.FETCH_USERS_BEGIN });

  getAllUsersApi(data, roleData)
    .then((res) => {
      dispatch({ type: actions.FETCH_USERS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_USERS_ERROR });
    });
};

export const getAllUsersDownload = (roleData) => (dispatch) => {
  dispatch({ type: actions.FETCH_USERS_DOWNLOAD_BEGIN });

  getAllUsersDownloadApi(roleData)
    .then((res) => {
      dispatch({
        type: actions.FETCH_USERS_DOWNLOAD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_USERS_DOWNLOAD_ERROR });
    });
};

export const createUser = (data, handleSuccess, typeData) => (dispatch) => {
  dispatch({ type: actions.CREATE_USER_BEGIN });

  createUserApi(data)
    .then((res) => {
      dispatch({ type: actions.CREATE_USER_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getAllUsers(data, typeData));
      successToast("User has been created");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.CREATE_USER_ERROR });
    });
};

export const changeApproval = (slug, data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.APPROVE_USER_BEGIN });
  changeApprovalApi(slug, data)
    .then((res) => {
      dispatch({ type: actions.APPROVE_USER_SUCCESS });
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.APPROVE_USER_ERROR });
    });
};

export const changeStatus = (slug, data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.CHANGE_USER_STATUS_BEGIN });
  changeStatusApi(slug, data)
    .then((res) => {
      dispatch({ type: actions.CHANGE_USER_STATUS_SUCCESS });
      handleSuccess && handleSuccess();
      successToast("User status has been changed");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.CHANGE_USER_STATUS_ERROR });
    });
};

export const updateUsers =
  (Data, slug, refetch = () => {}) =>
  async (dispatch) => {
    dispatch({ type: actions.UPDATE_USER_BEGIN });

    try {
      await updateUsersApi(Data, slug);
      refetch && refetch();
      dispatch({
        type: actions.UPDATE_USER_SUCCESS,
        payload: "",
      });
      successToast("User has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_USER_ERROR });
      errorToast(error);
    }
  };

export const changeUserRole = (slug, data, refetch) => (dispatch) => {
  dispatch({ type: actions.CHANGE_USER_ROLE_BEGIN });
  changeUserRoleApi(slug, data)
    .then((res) => {
      dispatch({ type: actions.CHANGE_USER_ROLE_SUCCESS });
      refetch && refetch();
    })
    .catch((error) => {
      dispatch({ type: actions.CHANGE_USER_ROLE_ERROR });
      errorToast(error);
    });
};

export const updateProfile = (slug, data) => (dispatch) => {
  dispatch({ type: actions.UPDATE_PROFILE_BEGIN });
  updateProfileApi(slug, data)
    .then((res) => {
      dispatch({ type: actions.UPDATE_PROFILE_SUCCESS });
      dispatch(updateGlobalUser(res.data.data));
      successToast("Profile Updated Successfully");
    })
    .catch((error) => {
      dispatch({ type: actions.UPDATE_PROFILE_ERROR });
      errorToast(error);
    });
};

export const deleteUsers =
  (Data, handleSuccess, filterData, roleData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_USERS_BEGIN });

    try {
      await deleteUsersApi(Data);
      dispatch({
        type: actions.DELETE_USERS_SUCCESS,
        payload: "",
      });
      dispatch(getAllUsers(filterData, roleData));
      handleSuccess && handleSuccess();
      successToast("User has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_USERS_ERROR });
      errorToast(error);
    }
  };

export const setUserSearch = (data) => (dispatch) => {
  dispatch({ type: actions.SEARCH_USER, payload: data });
};
