export default (actionType) =>
  ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((requestTypes, reqType) => {
    // eslint-disable-next-line no-param-reassign
    requestTypes[reqType] = `${actionType}_${reqType}`;

    return requestTypes;
  }, {});
