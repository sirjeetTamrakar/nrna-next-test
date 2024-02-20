import * as actions from './types';
const defaultState = {
  teams_loading: false,
  get_teams_loading: false,
  teamsData: [],
  delete_teams_loading: false,
  update_teams_loading: false,
  teams_status_loading: false
};

const teamsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_TEAMS_BEGIN:
      return {
        ...state,
        teams_loading: true
      };

    case actions.POST_TEAMS_SUCCESS:
    case actions.POST_TEAMS_ERROR:
      return { ...state, teams_loading: false };

    case actions.GET_TEAMS_BEGIN:
      return {
        ...state,
        get_teams_loading: true
      };

    case actions.GET_TEAMS_SUCCESS:
      return { ...state, get_teams_loading: false, teamsData: action.payload };

    case actions.GET_TEAMS_ERROR:
      return { ...state, get_teams_loading: false };

    case actions.DELETE_TEAMS_BEGIN:
      return { ...state, delete_teams_loading: true };

    case actions.DELETE_TEAMS_SUCCESS:
    case actions.DELETE_TEAMS_ERROR:
      return { ...state, delete_teams_loading: false };

    case actions.UPDATE_TEAMS_BEGIN:
      return { ...state, update_teams_loading: true };

    case actions.UPDATE_TEAMS_SUCCESS:
    case actions.UPDATE_TEAMS_ERROR:
      return { ...state, update_teams_loading: false };

    case actions.CHANGE_TEAMS_STATUS_BEGIN:
      return {
        ...state,
        teams_status_loading: true
      };

    case actions.CHANGE_TEAMS_STATUS_SUCCESS:
    case actions.CHANGE_TEAMS_STATUS_ERROR:
      return { ...state, teams_status_loading: false };

    default:
      return state;
  }
};

export default teamsReducer;
