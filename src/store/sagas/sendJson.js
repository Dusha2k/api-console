import {all, call, put, takeLatest} from 'redux-saga/effects';
import api from '../../helpers/sendsay';

import {ActionTypes} from '../../store/constants';
import {sendJson, sendJsonSuccess, sendJsonFailure} from '../actions/sendJson';
import {logoutSaga} from './auth';

export function* sendJsonSaga({payload}) {
  const data = JSON.parse(payload);
  console.log(data);
  try {
    yield api.sendsay.request(data);
    yield put(sendJsonSuccess({status: 'success', action: data?.action, body: data}));
  } catch (error) {
    if (error.id === 'error/auth/failed') {
      yield call(logoutSaga);
    } else {
      yield put(sendJsonFailure({status: 'fail', action: data?.action, body: data}));
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.SEND_JSON, sendJsonSaga)]);
}
