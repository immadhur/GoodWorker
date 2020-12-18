import axios from '../../axios-interceptor';
import { AUTHENTICATION, LOADING, ERROR, SET_AUTHENTICATION, LOGOUT } from '../action-types';

export const authenticateUser = (data, isSignup) => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true
    });
    const res = await axios.post(isSignup ? '/signup' : '/login', data);
    localStorage.setItem('token', res.data.data.token);
    localStorage.setItem('email', res.data.body.email);
    localStorage.setItem('isGWVerified', res.data.body.isGWVerified);
    dispatch({
      type: AUTHENTICATION,
      payload: {
        isGWVerified: res.data.body.isGWVerified
      }
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: ERROR,
      payload: error.response.data.message
    });
  }
};

export function setAuthentication (isAuth) {
  return {
    type: SET_AUTHENTICATION,
    payload: isAuth
  };
}

export const logout = () => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true
    });
    // await axios.get('/logout');
    dispatch({
      type: LOGOUT
    });
  } catch (error) {
    dispatch({
      type: LOADING,
      payload: false
    });
  }
};