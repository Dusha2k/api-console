import {ActionTypes} from '../constants';
import {handleActions} from 'redux-actions';

export type StateType = {loading: boolean; historyRequests: Array<any>; currentJsonTemplate: string | null; autoSendJson: boolean};

const initialState: StateType = {
  loading: false,
  historyRequests: [],
  currentJsonTemplate: null,
  autoSendJson: false,
};

export default {
  sendJson: handleActions(
    {
      [ActionTypes.SEND_JSON]: (state, {payload}) => {
        console.log(payload);
        return {
          ...state,
          loading: true,
          autoSendJson: false,
        };
      },
      [ActionTypes.SEND_JSON_SUCCESS]: (state, {payload}) => {
        console.log(payload);
        console.log(state);
        return {
          ...state,
          loading: false,
          autoSendJson: false,
          historyRequests: [payload, ...state.historyRequests],
        };
      },
      [ActionTypes.SEND_JSON_FAILURE]: (state, {payload}) => {
        console.log(payload);
        console.log(state);
        return {
          ...state,
          loading: false,
          autoSendJson: false,
          historyRequests: [payload, ...state.historyRequests],
        };
      },
      [ActionTypes.JSON_HISTORY_UPDATE]: (state, {payload}) => {
        return {
          ...state,
          historyRequests: [...((payload as unknown) as Array<any>)],
        };
      },
    },
    initialState
  ),
};