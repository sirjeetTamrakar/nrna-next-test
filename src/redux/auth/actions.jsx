import {
  changePasswordApi,
  completeRegistrationApi,
  forgotPasswordApi,
  loginApi,
  registerApi,
  resetPasswordApi,
} from "@/apis/auth";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const setGlobalUser = () => (dispatch) => {
  try {
    const user = localStorage.getItem("NRNA_USER");
    const country = localStorage.getItem("nccCountryName");
    const userObj = JSON.parse(user);
    dispatch({
      type: actions.SET_AUTH_USER,
      payload: { ...userObj, nccCountryName: country },
    });
  } catch (error) {
    errorToast(error);
  }
};

export const updateSurveyTaken = () => (dispatch) => {
  const user = localStorage.getItem("NRNA_USER");
  const userObj = JSON.parse(user);
  localStorage.setItem(
    "NRNA_USER",
    JSON.stringify({ ...userObj, has_taken_survey: true })
  );
  dispatch({ type: actions.UPDATE_SURVEY_TAKEN });
};

// login user
export const loginUser = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.LOGIN_BEGIN });
  loginApi(data)
    .then((res) => {
      const token = res.data.data?.token;
      const refreshToken = res?.data?.data?.refresh_token;
      const user = res.data.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("NRNA_USER", JSON.stringify(user));
      if (res?.data?.data?.user?.role_name == "superadmin") {
        localStorage.setItem("nccRole", "admin");
      }
      successToast("Successfully Signed In");
      dispatch({ type: actions.LOGIN_SUCCESS, payload: user });
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.LOGIN_ERROR });
    });
};

// logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("NRNA_USER");
};

// send forgot password mail
export const forgotPassword = (data, handleRedirect) => (dispatch) => {
  dispatch({
    type: actions.FORGOT_PASSWORD_BEGIN,
  });
  forgotPasswordApi(data)
    .then((res) => {
      dispatch({
        type: actions.FORGOT_PASSWORD_SUCCESS,
      });
      successToast("Reset Link sent to your email.");
      handleRedirect && handleRedirect();
    })
    .catch((error) => {
      dispatch({
        type: actions.FORGOT_PASSWORD_ERROR,
      });
      errorToast(error);
    });
};

// Set new Password with forgot password token or verify email
export const resetPassword = (data, handleRedirect) => (dispatch) => {
  dispatch({
    type: actions.RESET_PASSWORD_BEGIN,
  });
  resetPasswordApi(data)
    .then((res) => {
      dispatch({
        type: actions.RESET_PASSWORD_SUCCESS,
      });
      handleRedirect && handleRedirect();
      successToast("Password created Successfully");
    })
    .catch((error) => {
      dispatch({
        type: actions.RESET_PASSWORD_ERROR,
      });
      errorToast(error);
    });
};

// create user
export const registerUser = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.REGISTER_USER_BEGIN });
  registerApi(data)
    .then((res) => {
      dispatch({ type: actions.REGISTER_USER_SUCCESS, payload: res.data.data });
      handleSuccess && handleSuccess();
      successToast("User account created Successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.REGISTER_USER_ERROR });
    });
};

// update after profile save
export const updateGlobalUser = (user) => (dispatch) => {
  localStorage.setItem("NRNA_USER", JSON.stringify(user));
  dispatch({
    type: actions.SET_AUTH_USER,
    payload: user,
  });
};

// Set new Password with chnage password token or verify email
export const changePassword = (data, handleRedirect) => (dispatch) => {
  dispatch({
    type: actions.CHANGE_PASSWORD_BEGIN,
  });
  changePasswordApi(data)
    .then((res) => {
      dispatch({
        type: actions.CHANGE_PASSWORD_SUCCESS,
      });
      handleRedirect && handleRedirect();
      successToast("Password changed Successfully");
    })
    .catch((error) => {
      dispatch({
        type: actions.CHANGE_PASSWORD_ERROR,
      });
      errorToast(error);
    });
};

export const saveRoleDetails = (data) => (dispatch) => {
  dispatch({ type: actions.STORE_ROLE_DETAILS, payload: data });
};

export const saveAdminRoleDetails = (data) => (dispatch) => {
  dispatch({ type: actions.STORE_ADMIN_ROLE_DETAILS, payload: data });
};

export const saveAdminNccIdDetails = (data) => (dispatch) => {
  dispatch({ type: actions.STORE_ADMIN_NCC_ID_DETAILS, payload: data });
};

export const saveAdminNccCountry = (data) => (dispatch) => {
  dispatch({ type: actions.STORE_ADMIN_NCC_COUNTRY, payload: data });
};

// Complete user registration with new Password and token
export const completeRegistration = (data, handleRedirect) => (dispatch) => {
  dispatch({
    type: actions.COMPLETE_REGISTRATION_BEGIN,
  });
  completeRegistrationApi(data)
    .then((res) => {
      dispatch({
        type: actions.COMPLETE_REGISTRATION_SUCCESS,
      });
      handleRedirect && handleRedirect();
      successToast("User registration complete");
    })
    .catch((error) => {
      dispatch({
        type: actions.COMPLETE_REGISTRATION_ERROR,
      });
      errorToast(error);
    });
};
