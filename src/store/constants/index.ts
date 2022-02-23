import keyMirror from 'fbjs/lib/keyMirror';

export const ActionTypes = keyMirror({
  AUTHENTICATE: undefined,
  AUTHENTICATE_CHECK: undefined,
  AUTHENTICATE_SUCCESS: undefined,
  AUTHENTICATE_FAILURE: undefined,
  LOGOUT: undefined,
  LOGOUT_SUCCESS: undefined,
  LOGOUT_FAILURE: undefined,

  SEND_JSON: undefined,
  SEND_JSON_SUCCESS: undefined,
  SEND_JSON_FAILURE: undefined,
  JSON_HISTORY_UPDATE: undefined,
  SET_LAST_TEMPLATE: undefined,
});
