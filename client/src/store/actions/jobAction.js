import axios from '../../axios-interceptor';
import {
  UPDATE_JOBS_LIST,
  GET_JOB_DETAILS,
  SET_GW_VERIFICATION,
  SET_APPLIED_JOBS,
  LOADING
} from '../action-types';

export const updateJobsList = () => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true
    });
    const res = await axios.get('/jobs');
    console.log({ res });
    dispatch({
      type: UPDATE_JOBS_LIST,
      payload: res.data.body
    });
    const gwVerification = localStorage.getItem('isGWVerified');
    dispatch(setGWVerification(gwVerification === 'true'));
  } catch (error) {
    console.log({ error });
    dispatch({
      type: LOADING,
      payload: false
    });
  }
};

export function setGWVerification (isGWVerified) {
  return {
    type: SET_GW_VERIFICATION,
    payload: isGWVerified
  };
};

export const getJobDetails = (jobId) => async dispatch => {
  try {
    if (!jobId) {
      dispatch({
        type: GET_JOB_DETAILS,
        payload: {}
      });
      return;
    }
    dispatch({
      type: LOADING,
      payload: true
    });
    const res = await axios.get(`/jobs/${jobId}`);
    dispatch({
      type: GET_JOB_DETAILS,
      payload: res.data.body
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: LOADING,
      payload: false
    });
  }
};

export const getAppliedJobs = () => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true
    });
    const res = await axios.get('/applied');
    console.log({ res });
    dispatch({
      type: SET_APPLIED_JOBS,
      payload: res.data.body.jobs
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: LOADING,
      payload: false
    });
  }
};
