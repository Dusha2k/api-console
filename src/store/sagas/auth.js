import {all, put, call, takeLatest} from 'redux-saga/effects';
import api from 'src/helpers/sendsay';

import {ActionTypes} from 'src/store/constants';
import {authenticateSuccess, authenticateFailure, logout} from 'src/store/actions/auth';

export function* authenticateCheckSaga() {
  try {
    yield api.sendsay.request({
      action: 'sys.settings.get',
    });
  } catch (error) {
    if (error.id === 'error/auth/failed') {
      yield call(logoutSaga);
    }
  }
}

export function* authenticateSaga({payload}) {
  const response = yield api.sendsay
    .login({
      login: payload.login,
      subLogin: payload.sublogin,
      password: payload.password,
    })
    .then(() => {
      document.cookie = `sendsay_session=${api.sendsay.session}`;
    })
    .catch((err) => {
      document.cookie = '';
      console.log('err', err);
      return err;
    });

  if (response) {
    yield put(authenticateFailure({loginError: response}));
  } else {
    yield put(
      authenticateSuccess({
        sessionKey: api.sendsay.session,
        login: payload.login,
        subLogin: payload.sublogin,
      })
    );
  }
}

export function* logoutSaga() {
  yield put(authenticateFailure());
  document.cookie = '';
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.AUTHENTICATE, authenticateSaga),
    takeLatest(ActionTypes.AUTHENTICATE_CHECK, authenticateCheckSaga),
    takeLatest(ActionTypes.LOGOUT, logoutSaga),
  ]);
}
