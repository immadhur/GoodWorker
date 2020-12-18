import {
  UPDATE_JOBS_LIST,
  GET_JOB_DETAILS,
  SET_GW_VERIFICATION,
  AUTHENTICATION,
  SET_AUTHENTICATION,
  LOADING,
  ERROR,
  LOGOUT,
  SET_APPLIED_JOBS
} from '../action-types';

const initialState = {
  jobs: [],
  selectedJob: {},
  isGWVerified: false,
  appliedJobs: [],
  isAuthenticated: false,
  currentUser: {},
  loading: false,
  error: ''
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_JOBS_LIST:
      return {
        ...state,
        jobs: payload,
        loading: false
      };
    case GET_JOB_DETAILS:
      return {
        ...state,
        selectedJob: payload,
        loading: false
      };
    case SET_GW_VERIFICATION:
      return {
        ...state,
        isGWVerified: payload
      };
    case AUTHENTICATION:
      return {
        ...state,
        isGWVerified: payload.isGWVerified,
        isAuthenticated: true,
        loading: false,
        error: ''
      };
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case LOADING:
      return {
        ...state,
        loading: payload,
        error: ''
      };
    case ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case LOGOUT:
      return {
        ...initialState,
        jobs: state.jobs
      };
    case SET_APPLIED_JOBS:
      return {
        ...state,
        appliedJobs: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;