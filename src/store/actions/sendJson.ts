import {createActions} from 'redux-actions';

import {ActionTypes} from '../constants';

export const {sendJson, sendJsonSuccess, sendJsonFailure, jsonHistoryUpdate, setLastTemplate} = createActions({
  [ActionTypes.SEND_JSON]: (payload) => payload,
  [ActionTypes.SEND_JSON_SUCCESS]: (payload) => payload,
  [ActionTypes.SEND_JSON_FAILURE]: (payload) => payload,
  [ActionTypes.JSON_HISTORY_UPDATE]: (payload) => payload,
  [ActionTypes.SET_LAST_TEMPLATE]: (payload) => payload,
});
