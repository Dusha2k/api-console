import {ActionTypes} from '../constants';
import {handleActions} from 'redux-actions';

export type StateType = {
  loading: boolean;
  historyRequests: Array<any>;
  currentJsonTemplate: string | null;
  autoSendJson: boolean;
  lastTemplateJson: Array<string>;
};

const initialState: StateType = {
  loading: false,
  historyRequests: [],
  currentJsonTemplate: null,
  autoSendJson: false,
  lastTemplateJson: ['', ''],
};

export default {
  sendJson: handleActions<StateType, any>(
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
          historyRequests: [...payload],
        };
      },
      [ActionTypes.SET_LAST_TEMPLATE]: (state, {payload}) => {
        return {
          ...state,
          lastTemplateJson: [payload[0], payload[1]],
        };
      },
    },
    initialState
  ),
};
