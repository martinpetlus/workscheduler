import { actionTypes } from 'modules/user';

export default function authMiddleware(history) {
  return () => (next) => (action) => {
    const { type, meta } = action;

    const result = next(action);

    if (meta &&
        meta.nextPathname &&
        type === actionTypes.SIGN_IN.SUCCESS) {
      history.replace(meta.nextPathname);
    }

    return result;
  };
}
