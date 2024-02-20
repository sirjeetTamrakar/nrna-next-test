import * as actions from './types';
const defaultState = {
  department_loading: false,
  get_department_loading: false,
  departmentData: [],
  delete_department_loading: false,
  update_department_loading: false,
  department_status_loading: false
};

const departmentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_DEPARTMENT_BEGIN:
      return {
        ...state,
        department_loading: true
      };

    case actions.POST_DEPARTMENT_SUCCESS:
    case actions.POST_DEPARTMENT_ERROR:
      return { ...state, department_loading: false };

    case actions.GET_DEPARTMENT_BEGIN:
      return {
        ...state,
        get_department_loading: true
      };

    case actions.GET_DEPARTMENT_SUCCESS:
      return { ...state, get_department_loading: false, departmentData: action.payload };

    case actions.GET_DEPARTMENT_ERROR:
      return { ...state, get_department_loading: false };

    case actions.DELETE_DEPARTMENT_BEGIN:
      return { ...state, delete_department_loading: true };

    case actions.DELETE_DEPARTMENT_SUCCESS:
    case actions.DELETE_DEPARTMENT_ERROR:
      return { ...state, delete_department_loading: false };

    case actions.UPDATE_DEPARTMENT_BEGIN:
      return { ...state, update_department_loading: true };

    case actions.UPDATE_DEPARTMENT_SUCCESS:
    case actions.UPDATE_DEPARTMENT_ERROR:
      return { ...state, update_department_loading: false };

    case actions.CHANGE_DEPARTMENT_STATUS_BEGIN:
      return {
        ...state,
        department_status_loading: true
      };

    case actions.CHANGE_DEPARTMENT_STATUS_SUCCESS:
    case actions.CHANGE_DEPARTMENT_STATUS_ERROR:
      return { ...state, department_status_loading: false };

    default:
      return state;
  }
};

export default departmentReducer;
