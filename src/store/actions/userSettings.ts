import {createActions} from 'redux-actions';

import {ActionTypes} from '../constants';

export const {switchScreenMode} = createActions({
  [ActionTypes.SWITCH_SCREEN_MODE]: (payload) => payload,
});
