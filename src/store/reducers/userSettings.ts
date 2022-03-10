import {ActionTypes} from '../constants';
import {handleActions} from 'redux-actions';

const initialState: {fullScreen: boolean | null} = {
  fullScreen: false,
};

export default {
  userSettings: handleActions(
    {
      [ActionTypes.SWITCH_SCREEN_MODE]: (state) => {
        return {
          ...state,
          fullScreen: !state.fullScreen,
        };
      },
    },
    initialState
  ),
};
