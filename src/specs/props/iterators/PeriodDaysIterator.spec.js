
'use strict';

const PeriodDaysIterator = require('./../../../props/iterators/PeriodDaysIterator');

describe('PeriodDaysIterator', function() {
  let iter;

  beforeEach(function() {
    iter = new PeriodDaysIterator({ weeks: 2 });
  });

  it('should iterate through period days', function() {
    expect(iter.isDone()).toBe(false);
    expect(iter.current()).toEqual({ week: 1, day: 1 });
    expect(iter.next()).toEqual({ week: 1, day: 1 });
    expect(iter.current()).toEqual({ week: 1, day: 2 });
    expect(iter.next()).toEqual({ week: 1, day: 2 });
    iter.next();
    iter.next();
    iter.next();
    iter.next();
    expect(iter.next()).toEqual({ week: 1, day: 7 });
    expect(iter.current()).toEqual({ week: 2, day: 1 });
    iter.next();
    expect(iter.current()).toEqual({ week: 2, day: 2 });
    iter.next();
    iter.next();
    iter.next();
    iter.next();
    expect(iter.next()).toEqual({ week: 2, day: 6 });
    expect(iter.current()).toEqual({ week: 2, day: 7 });
    expect(iter.isDone()).toBe(false);
    expect(iter.next()).toEqual({ week: 2, day: 7 });
    expect(iter.isDone()).toBe(true);
    expect(iter.next()).toBe(null);
    expect(iter.current()).toBe(null);
  });
});
