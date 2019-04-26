import client from '../../client';
import CONSTANTS from '../../constants';
import { types as TopicsTypes } from '../topics/constants';

// CONSTANTS
const types = {
  CREATE_USER: 'CREATE_USER',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAIL: 'CREATE_USER_FAIL'
};

const INITIAL_STATE = {
  loading: false
};

// ACTIONS
const createUser = data => dispatch => {
  dispatch({ type: types.CREATE_USER });
  return client
    .post(`${CONSTANTS.API.REGISTER}`, data, {
      headers: { Token: '6a4dc8edfce1a8bf8a89cdfeab0d836a2ef32275' }
    })

    .then(async response => {
      await dispatch({
        type: types.CREATE_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch(() => {
      dispatch({ type: types.CREATE_USER_FAIL });
      return Promise.reject();
    });
};

// REDUCER
export default function reducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.CREATE_USER:
      return { ...state, loading: true };

    case types.CREATE_USER_SUCCESS:
    case types.CREATE_USER_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export { createUser };
