import { expect } from 'chai';

import createRequestActionTypes from './createRequestActionTypes';

describe('createRequestActionTypes', () => {
  it('should create request action types for single action type', () => {
    const ACTION_TYPE = 'ACTION_TYPE';

    const expected = {
      [ACTION_TYPE]: {
        REQUEST: `${ACTION_TYPE}_REQUEST`,
        SUCCESS: `${ACTION_TYPE}_SUCCESS`,
        FAILURE: `${ACTION_TYPE}_FAILURE`,
      },
    };

    expect(createRequestActionTypes(ACTION_TYPE)).to.eql(expected);
  });

  it('should create request action types for array of action types', () => {
    const ACTION_TYPE_1 = 'ACTION_TYPE_1';
    const ACTION_TYPE_2 = 'ACTION_TYPE_2';

    const expected = {
      [ACTION_TYPE_1]: {
        REQUEST: `${ACTION_TYPE_1}_REQUEST`,
        SUCCESS: `${ACTION_TYPE_1}_SUCCESS`,
        FAILURE: `${ACTION_TYPE_1}_FAILURE`,
      },
      [ACTION_TYPE_2]: {
        REQUEST: `${ACTION_TYPE_2}_REQUEST`,
        SUCCESS: `${ACTION_TYPE_2}_SUCCESS`,
        FAILURE: `${ACTION_TYPE_2}_FAILURE`,
      },
    };

    expect(createRequestActionTypes([ACTION_TYPE_1, ACTION_TYPE_2])).to.eql(expected);
  });
});
