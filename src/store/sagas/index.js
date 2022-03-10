import {all, fork} from 'redux-saga/effects';

import login from 'src/store/sagas/auth';
import sendJson from './sendJson';

export default function* root() {
  yield all([fork(login), fork(sendJson)]);
}
