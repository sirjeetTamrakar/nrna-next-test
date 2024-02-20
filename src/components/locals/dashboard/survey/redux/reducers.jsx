import * as actions from './types';
const defaultState = {
  questions: [],
  questions_loading: false,
  create_question_loading: false,
  update_question_loading: false,
  delete_question_loading: false,
  question_status_loading: false,
  post_question_front_loading: false,
  post_question_check_front_loading: false,
  result: [],
  result_loading: false,
  participants: [],
  participants_loading: false,
  participant_result: [],
  participant_result_loading: false,
  survey: [],
  survey_loading: false,
  create_survey_loading: false,
  update_survey_loading: false,
  delete_survey_loading: false,
  survey_status_loading: false
};

const questionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.FETCH_QUESTIONS_BEGIN:
      return {
        ...state,
        questions_loading: true
      };

    case actions.FETCH_QUESTIONS_SUCCESS:
      return { ...state, questions_loading: false, questions: action.payload };

    case actions.FETCH_QUESTIONS_ERROR:
      return { ...state, questions_loading: false };

    case actions.CREATE_QUESTION_BEGIN:
      return {
        ...state,
        create_question_loading: true
      };

    case actions.CREATE_QUESTION_SUCCESS:
    case actions.CREATE_QUESTION_ERROR:
      return { ...state, create_question_loading: false };

    case actions.UPDATE_QUESTION_BEGIN:
      return {
        ...state,
        update_question_loading: true
      };

    case actions.UPDATE_QUESTION_SUCCESS:
    case actions.UPDATE_QUESTION_ERROR:
      return { ...state, update_question_loading: false };

    case actions.DELETE_QUESTION_BEGIN:
      return {
        ...state,
        delete_question_loading: true
      };

    case actions.DELETE_QUESTION_SUCCESS:
    case actions.DELETE_QUESTION_ERROR:
      return { ...state, delete_question_loading: false };

    case actions.CHANGE_QUESTION_STATUS_BEGIN:
      return {
        ...state,
        question_status_loading: true
      };

    case actions.CHANGE_QUESTION_STATUS_SUCCESS:
    case actions.CHANGE_QUESTION_STATUS_ERROR:
      return { ...state, question_status_loading: false };

    // post questions front ------------------->
    case actions.POST_QUESTION_FRONT_BEGIN:
      return {
        ...state,
        post_question_front_loading: true
      };

    case actions.POST_QUESTION_FRONT_SUCCESS:
    case actions.POST_QUESTION_FRONT_ERROR:
      return { ...state, post_question_front_loading: false };

    case actions.POST_QUESTION_CHECK_FRONT_BEGIN:
      return {
        ...state,
        post_question_check_front_loading: true
      };

    case actions.POST_QUESTION_CHECK_FRONT_SUCCESS:
      return {
        ...state,
        post_question_check_front_loading: false
      };

    case actions.POST_QUESTION_CHECK_FRONT_ERROR:
      return {
        ...state,
        post_question_check_front_loading: false
      };

    case actions.FETCH_SURVEY_RESULT_BEGIN:
      return {
        ...state,
        result_loading: true
      };

    case actions.FETCH_SURVEY_RESULT_SUCCESS:
      return {
        ...state,
        result_loading: false,
        result: action.payload
      };

    case actions.FETCH_SURVEY_RESULT_ERROR:
      return {
        ...state,
        result_loading: false
      };

    case actions.FETCH_PARTICIPANT_BEGIN:
      return {
        ...state,
        participants_loading: true
      };

    case actions.FETCH_PARTICIPANT_SUCCESS:
      return {
        ...state,
        participants_loading: false,
        participants: action.payload
      };

    case actions.FETCH_PARTICIPANT_ERROR:
      return {
        ...state,
        participants_loading: false
      };

    case actions.FETCH_PARTICIPANT_RESULT_BEGIN:
      return {
        ...state,
        participant_result_loading: true
      };

    case actions.FETCH_PARTICIPANT_RESULT_SUCCESS:
      return {
        ...state,
        participant_result_loading: false,
        participant_result: action.payload
      };

    case actions.FETCH_PARTICIPANT_RESULT_ERROR:
      return {
        ...state,
        participant_result_loading: false
      };

    // survey
    case actions.FETCH_SURVEY_BEGIN:
      return {
        ...state,
        survey_loading: true
      };

    case actions.FETCH_SURVEY_SUCCESS:
      return { ...state, survey_loading: false, survey: action.payload };

    case actions.FETCH_SURVEY_ERROR:
      return { ...state, survey_loading: false };

    case actions.CREATE_SURVEY_BEGIN:
      return {
        ...state,
        create_survey_loading: true
      };

    case actions.CREATE_SURVEY_SUCCESS:
    case actions.CREATE_SURVEY_ERROR:
      return { ...state, create_survey_loading: false };

    case actions.UPDATE_SURVEY_BEGIN:
      return {
        ...state,
        update_survey_loading: true
      };

    case actions.UPDATE_SURVEY_SUCCESS:
    case actions.UPDATE_SURVEY_ERROR:
      return { ...state, update_survey_loading: false };

    case actions.DELETE_SURVEY_BEGIN:
      return {
        ...state,
        delete_survey_loading: true
      };

    case actions.DELETE_SURVEY_SUCCESS:
    case actions.DELETE_SURVEY_ERROR:
      return { ...state, delete_survey_loading: false };

    case actions.CHANGE_SURVEY_STATUS_BEGIN:
      return {
        ...state,
        survey_status_loading: true
      };

    case actions.CHANGE_SURVEY_STATUS_SUCCESS:
    case actions.CHANGE_SURVEY_STATUS_ERROR:
      return { ...state, survey_status_loading: false };

    default:
      return state;
  }
};

export default questionReducer;
