import {all, call, put, takeLatest} from 'redux-saga/effects';
import api from '../../helpers/sendsay';

import {ActionTypes} from '../constants';
import {sendJsonSuccess, sendJsonFailure} from '../actions';
import {logoutSaga} from './auth';

export function* sendJsonSaga({payload}) {
  const data = JSON.parse(payload);
  try {
    const response = yield api.sendsay.request(data);
    yield put(sendJsonSuccess({status: 'success', action: data?.action, body: data, response: response}));
  } catch (error) {
    if (error.id === 'error/auth/failed') {
      yield call(logoutSaga);
    } else {
      yield put(sendJsonFailure({status: 'fail', action: data?.action, body: data, response: error}));
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.SEND_JSON, sendJsonSaga)]);
}
