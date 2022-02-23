import login from 'src/store/reducers/auth';
import sendJson from 'src/store/reducers/sendJson';
import userSettings from '../reducers/userSettings';

export default {
  ...login,
  ...sendJson,
  ...userSettings,
};
