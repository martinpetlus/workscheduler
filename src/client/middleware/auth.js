import { SUCCESS_TYPE } from 'utils/createRequestActionTypes';

export default function authMiddleware(history) {
  return () => (next) => (action) => {
    const { type, meta } = action;

    const result = next(action);

    if (meta &&
        meta.nextPathname &&
        type.endsWith(SUCCESS_TYPE)) {
      history.replace(meta.nextPathname);
    }

    return result;
  };
}
