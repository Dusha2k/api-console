import login from 'src/store/reducers/auth';
import sendJson from 'src/store/reducers/jsonResponse';
import userSettings from '../reducers/userSettings';

export default {
  ...login,
  ...sendJson,
  ...userSettings,
};
