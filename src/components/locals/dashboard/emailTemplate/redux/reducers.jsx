import * as actions from './types';
const defaultState = {
  email_template_loading: false,
  get_email_template_loading: false,
  email_templateData: [],
  delete_email_template_loading: false,
  update_email_template_loading: false,
  email_template_status_loading: false
};

const emailTemplateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_EMAIL_TEMPLATE_BEGIN:
      return {
        ...state,
        email_template_loading: true
      };

    case actions.POST_EMAIL_TEMPLATE_SUCCESS:
    case actions.POST_EMAIL_TEMPLATE_ERROR:
      return { ...state, email_template_loading: false };

    case actions.GET_EMAIL_TEMPLATE_BEGIN:
      return {
        ...state,
        get_email_template_loading: true
      };

    case actions.GET_EMAIL_TEMPLATE_SUCCESS:
      return { ...state, get_email_template_loading: false, email_templateData: action.payload };

    case actions.GET_EMAIL_TEMPLATE_ERROR:
      return { ...state, get_email_template_loading: false };

    case actions.DELETE_EMAIL_TEMPLATE_BEGIN:
      return { ...state, delete_email_template_loading: true };

    case actions.DELETE_EMAIL_TEMPLATE_SUCCESS:
    case actions.DELETE_EMAIL_TEMPLATE_ERROR:
      return { ...state, delete_email_template_loading: false };

    case actions.UPDATE_EMAIL_TEMPLATE_BEGIN:
      return { ...state, update_email_template_loading: true };

    case actions.UPDATE_EMAIL_TEMPLATE_SUCCESS:
    case actions.UPDATE_EMAIL_TEMPLATE_ERROR:
      return { ...state, update_email_template_loading: false };

    case actions.EMAIL_TEMPLATE_STATUS_SET_BEGIN:
    case actions.EMAIL_TEMPLATE_STATUS_REMOVE_BEGIN:
      return {
        ...state,
        email_template_status_loading: true
      };

    case actions.EMAIL_TEMPLATE_STATUS_SET_SUCCESS:
    case actions.EMAIL_TEMPLATE_STATUS_SET_ERROR:
    case actions.EMAIL_TEMPLATE_STATUS_REMOVE_SUCCESS:
    case actions.EMAIL_TEMPLATE_STATUS_REMOVE_ERROR:
      return { ...state, email_template_status_loading: false };

    default:
      return state;
  }
};

export default emailTemplateReducer;
