import login from 'src/store/reducers/auth';
import sendJson from 'src/store/reducers/sendJson';

export default {
  ...login,
  ...sendJson,
};
