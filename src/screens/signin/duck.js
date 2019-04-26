import client from '../../client';
import CONSTANTS from '../../constants';
import { types as TopicsTypes } from '../topics/constants';

// CONSTANTS

const types = {
  LOGIN_USER: 'LOGIN_USER',
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAIL: 'LOGIN_USER_FAIL'
};

const INITIAL_STATE = {
  loading: false
};

// ACTIONS

const loginUser = data => dispatch => {
  dispatch({ type: types.LOGIN_USER });

  return client
    .post(`${CONSTANTS.API.SIGN_IN}`, data, {
      headers: { Token: '6a4dc8edfce1a8bf8a89cdfeab0d836a2ef32275' }
    })
    .then(async response => {
      await dispatch({
        type: types.LOGIN_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      dispatch({ type: types.LOGIN_USER_FAIL });
      return Promise.reject();
    });
};

// REDUCER

export default function reducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return { ...state, loading: true };

    case types.LOGIN_USER_SUCCESS:
    case types.LOGIN_USER_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export { loginUser };
