import { hashHistory } from 'react-router';

import { actionTypes } from 'modules/user';

export default function authMiddleware() {
  return () => (next) => (action) => {
    const { type, meta } = action;

    const ret = next(action);

    if (meta &&
        meta.nextPathname &&
        type === actionTypes.SIGN_IN.SUCCESS) {
      hashHistory.replace(meta.nextPathname);
    }

    return ret;
  };
}
