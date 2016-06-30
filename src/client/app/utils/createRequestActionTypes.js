const REQUEST_TYPES = ['REQUEST', 'SUCCESS', 'FAILURE'];

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
