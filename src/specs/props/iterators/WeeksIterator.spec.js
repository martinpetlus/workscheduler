
'use strict';

const WeeksIterator = require('./../../../props/iterators/WeeksIterator');

describe('WeeksIterator', function() {
  let iter;

  beforeEach(function() {
    iter = new WeeksIterator({ weeks: 3 });
  });

  it('should iterate through weeks', function() {
    expect(iter.isDone()).toBe(false);
    expect(iter.current()).toEqual({ week: 1 });
    expect(iter.next()).toEqual({ week: 1 });
    expect(iter.isDone()).toBe(false);
    expect(iter.next()).toEqual({ week: 2 });
    expect(iter.isDone()).toBe(false);
    expect(iter.current()).toEqual({ week: 3 });
    expect(iter.next()).toEqual({ week: 3 });
    expect(iter.isDone()).toBe(true);
    expect(iter.current()).toBe(null);
    expect(iter.next()).toBe(null);
  });
});
