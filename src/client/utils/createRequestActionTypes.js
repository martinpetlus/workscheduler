export const REQUEST_TYPE = 'REQUEST';
export const SUCCESS_TYPE = 'SUCCESS';
export const FAILURE_TYPE = 'FAILURE';

export const REQUEST_TYPES = [REQUEST_TYPE, SUCCESS_TYPE, FAILURE_TYPE];

export default (actionType) =>
  (Array.isArray(actionType) ? actionType : [actionType]).reduce(
    (reqActionTypes, currActionType) => {
      // eslint-disable-next-line no-param-reassign
      reqActionTypes[currActionType] = REQUEST_TYPES.reduce((requestTypes, reqType) => {
        // eslint-disable-next-line no-param-reassign
        requestTypes[reqType] = `${currActionType}_${reqType}`;

        return requestTypes;
      }, {});

      return reqActionTypes;
    },
    {}
  );
