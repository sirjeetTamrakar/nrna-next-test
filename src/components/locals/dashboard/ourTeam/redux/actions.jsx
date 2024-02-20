import {
  changeTeamsStatusApi,
  deleteTeamsApi,
  getTeamsApi,
  postTeamsApi,
  updateTeamsApi,
} from "@/apis/dashboard";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getTeams = (data) => (dispatch) => {
  dispatch({ type: actions.GET_TEAMS_BEGIN });
  getTeamsApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_TEAMS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_TEAMS_ERROR });
    });
};

export const postTeams = (data, handleSuccess, typeData) => (dispatch) => {
  dispatch({ type: actions.POST_TEAMS_BEGIN });
  postTeamsApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_TEAMS_SUCCESS });
      successToast("Team member added successfully");
      handleSuccess && handleSuccess();
      dispatch(getTeams(typeData));
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_TEAMS_ERROR });
    });
};

export const deleteTeams =
  (Data, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_TEAMS_BEGIN });

    try {
      await deleteTeamsApi(Data);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.DELETE_TEAMS_SUCCESS,
        payload: "",
      });
      dispatch(getTeams(typeData));
      successToast("Team member has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_TEAMS_ERROR });
      errorToast(error);
    }
  };

export const updateTeams =
  (Data, slug, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_TEAMS_BEGIN });

    try {
      await updateTeamsApi(Data, slug);
      handleSuccess && handleSuccess();
      dispatch({
        type: actions.UPDATE_TEAMS_SUCCESS,
        payload: "",
      });
      dispatch(getTeams(typeData));
      successToast("Teams has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_TEAMS_ERROR });
      errorToast(error);
    }
  };

export const changeTeamsStatus =
  (data, handleSuccess, typeData) => (dispatch) => {
    dispatch({ type: actions.CHANGE_TEAMS_STATUS_BEGIN });
    changeTeamsStatusApi(data)
      .then((res) => {
        dispatch({ type: actions.CHANGE_TEAMS_STATUS_SUCCESS });
        handleSuccess && handleSuccess();
        dispatch(getTeams(typeData));
        successToast("Status has been changed");
      })
      .catch((error) => {
        errorToast(error);
        dispatch({ type: actions.CHANGE_TEAMS_STATUS_ERROR });
      });
  };
