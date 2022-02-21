import {handleActions} from 'redux-actions';

import {ActionTypes} from 'src/store/constants';

export const initialState = {
  loading: false,
  sessionKey: null,
  login: null,
  subLogin: null,
  loginError: null,
};

export default {
  auth: handleActions(
    {
      [ActionTypes.AUTHENTICATE]: (state) => {
        return {
          ...state,
          loading: true,
        };
      },
      [ActionTypes.AUTHENTICATE_SUCCESS]: (state, {payload}) => {
        return {
          ...state,
          loading: false,
          sessionKey: payload.sessionKey,
          login: payload.login,
          subLogin: payload.sublogin,
          loginError: null,
        };
      },
      [ActionTypes.AUTHENTICATE_FAILURE]: (state, {payload}) => {
        const {explain, id} = payload.loginError;
        return {
          ...state,
          loading: false,
          sessionKey: null,
          login: null,
          subLogin: null,
          loginError: {id: id, explain: explain},
        };
      },
      [ActionTypes.LOGOUT]: (state) => {
        return {
          ...state,
          loading: false,
          sessionKey: null,
        };
      },
    },
    initialState
  ),
};
