import {ActionTypes} from '../constants';
import {handleActions} from 'redux-actions';

export type StateType = {
  loading: boolean;
  historyRequests: Array<any>;
  currentJsonTemplate: string | null;
  autoSendJson: boolean;
  lastTemplateJson: {template: Array<string>; status: string | null};
};

const initialState: StateType = {
  loading: false,
  historyRequests: [],
  currentJsonTemplate: null,
  autoSendJson: false,
  lastTemplateJson: {template: ['', ''], status: null},
};

const returnUniqueArray = (arr: any, item: any) => {
  let findIndex = null;
  const myArr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i].body) === JSON.stringify(item.body)) findIndex = i;
  }

  if (findIndex !== null) {
    myArr.splice(findIndex, 1);
    myArr.unshift(item);
    return myArr;
  }

  return [item, ...arr].length > 20 ? [item, ...arr].slice(0, -1) : [item, ...arr];
};

export default {
  sendJson: handleActions<StateType, any>(
    {
      [ActionTypes.SEND_JSON]: (state) => {
        return {
          ...state,
          loading: true,
          autoSendJson: false,
        };
      },
      [ActionTypes.SEND_JSON_SUCCESS]: (state, {payload}) => {
        return {
          ...state,
          loading: false,
          autoSendJson: false,
          historyRequests: returnUniqueArray(state.historyRequests, payload),
        };
      },
      [ActionTypes.SEND_JSON_FAILURE]: (state, {payload}) => {
        return {
          ...state,
          loading: false,
          autoSendJson: false,
          historyRequests: returnUniqueArray(state.historyRequests, payload),
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
          lastTemplateJson: payload,
        };
      },
      [ActionTypes.DELETE_HISTORY_REQUEST]: (state, {payload}) => {
        return {
          ...state,
          historyRequests: state.historyRequests.filter((item) => {
            return item.body !== payload;
          }),
        };
      },
    },
    initialState
  ),
};
