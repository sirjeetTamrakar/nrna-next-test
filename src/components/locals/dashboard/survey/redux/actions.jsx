import {
  changeStatusApi,
  changeSurveyStatusApi,
  createQuestionApi,
  createSurveyApi,
  deleteQuestionApi,
  deleteSurveyApi,
  getAllQuestionsApi,
  getAllSurveyApi,
  getParticipantResultApi,
  getParticipantsApi,
  getSurveyResultApi,
  postQuestionCheckFrontApi,
  postQuestionFrontApi,
  updateQuestionApi,
  updateSurveyApi,
} from "@/apis/dashboard/survey";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getAllQuestions = () => (dispatch) => {
  dispatch({ type: actions.FETCH_QUESTIONS_BEGIN });

  getAllQuestionsApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_QUESTIONS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_QUESTIONS_ERROR });
    });
};

export const createQuestion = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.CREATE_QUESTION_BEGIN });

  createQuestionApi(data)
    .then((res) => {
      dispatch({ type: actions.CREATE_QUESTION_SUCCESS });
      successToast("Question created successfully");
      handleSuccess && handleSuccess();
      dispatch(getAllQuestions());
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.CREATE_QUESTION_ERROR });
    });
};

export const updateQuestion = (id, data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.UPDATE_QUESTION_BEGIN });
  updateQuestionApi(id, data)
    .then((res) => {
      dispatch({ type: actions.UPDATE_QUESTION_SUCCESS });
      successToast("Question updated successfully");

      handleSuccess && handleSuccess();
      dispatch(getAllQuestions());
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.UPDATE_QUESTION_ERROR });
    });
};

export const changeStatus = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.CHANGE_QUESTION_STATUS_BEGIN });
  changeStatusApi(data)
    .then((res) => {
      dispatch({ type: actions.CHANGE_QUESTION_STATUS_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getAllQuestions());
      successToast("Status has been changed");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.CHANGE_QUESTION_STATUS_ERROR });
    });
};

export const deleteQuestion = (id, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.DELETE_QUESTION_BEGIN });
  deleteQuestionApi(id)
    .then((res) => {
      dispatch({ type: actions.DELETE_QUESTION_SUCCESS });
      successToast("Question deleted successfully");

      handleSuccess && handleSuccess();
      dispatch(getAllQuestions());
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.DELETE_QUESTION_ERROR });
    });
};

// post questions front ------------->

export const postQuestionFront = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_QUESTION_FRONT_BEGIN });

  postQuestionFrontApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_QUESTION_FRONT_SUCCESS });
      successToast("Survey submitted successfully");
      handleSuccess && handleSuccess();
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_QUESTION_FRONT_ERROR });
    });
};

// check user has taken survey or not
export const postQuestionCheckFront = (data) => (dispatch) => {
  dispatch({ type: actions.POST_QUESTION_CHECK_FRONT_BEGIN });

  postQuestionCheckFrontApi(data)
    .then(({ res }) => {
      dispatch({ type: actions.POST_QUESTION_CHECK_FRONT_SUCCESS });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_QUESTION_CHECK_FRONT_ERROR });
    });
};

// get survey result
export const getSurveyResult = () => (dispatch) => {
  dispatch({ type: actions.FETCH_SURVEY_RESULT_BEGIN });
  getSurveyResultApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_SURVEY_RESULT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({ type: actions.FETCH_SURVEY_RESULT_ERROR });
    });
};

// get participants
export const getParticipants = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_PARTICIPANT_BEGIN });
  getParticipantsApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_PARTICIPANT_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: actions.FETCH_PARTICIPANT_ERROR });
    });
};

// get participants result
export const getParticipantsResult = (slug, user_id) => (dispatch) => {
  dispatch({ type: actions.FETCH_PARTICIPANT_RESULT_BEGIN });
  getParticipantResultApi(slug, user_id)
    .then((res) => {
      dispatch({
        type: actions.FETCH_PARTICIPANT_RESULT_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(() => {
      dispatch({ type: actions.FETCH_PARTICIPANT_RESULT_ERROR });
    });
};

// status---------
export const getAllSurvey = (data) => (dispatch) => {
  dispatch({ type: actions.FETCH_SURVEY_BEGIN });

  getAllSurveyApi(data)
    .then((res) => {
      dispatch({ type: actions.FETCH_SURVEY_SUCCESS, payload: res.data.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.FETCH_SURVEY_ERROR });
    });
};

export const createSurvey = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.CREATE_SURVEY_BEGIN });

  createSurveyApi(data)
    .then((res) => {
      dispatch({ type: actions.CREATE_SURVEY_SUCCESS });
      successToast("Survey created successfully");
      handleSuccess && handleSuccess();
      dispatch(getAllSurvey());
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.CREATE_SURVEY_ERROR });
    });
};

export const updateSurvey = (data, id, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.UPDATE_SURVEY_BEGIN });
  updateSurveyApi(id, data)
    .then((res) => {
      dispatch({ type: actions.UPDATE_SURVEY_SUCCESS });
      successToast("Survey updated successfully");

      handleSuccess && handleSuccess();
      dispatch(getAllSurvey());
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.UPDATE_SURVEY_ERROR });
    });
};

export const changeSurveyStatus = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.CHANGE_SURVEY_STATUS_BEGIN });
  changeSurveyStatusApi(data)
    .then((res) => {
      dispatch({ type: actions.CHANGE_SURVEY_STATUS_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getAllSurvey());
      successToast("Status has been changed");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.CHANGE_SURVEY_STATUS_ERROR });
    });
};

export const deleteSurvey = (id, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.DELETE_SURVEY_BEGIN });
  deleteSurveyApi(id)
    .then((res) => {
      dispatch({ type: actions.DELETE_SURVEY_SUCCESS });
      successToast("Survey deleted successfully");

      handleSuccess && handleSuccess();
      dispatch(getAllSurvey());
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.DELETE_SURVEY_ERROR });
    });
};
