const REQ_TO_PROMISE_TYPE = {
  REQUEST: 'PENDING',
  SUCCESS: 'FULFILLED',
  FAILURE: 'REJECTED',
};

export default (actionType) =>
  Object.keys(REQ_TO_PROMISE_TYPE).reduce((requestTypes, reqType) => {
    // eslint-disable-next-line no-param-reassign
    requestTypes[reqType] = `${actionType}_${REQ_TO_PROMISE_TYPE[reqType]}`;

    return requestTypes;
  }, {});
