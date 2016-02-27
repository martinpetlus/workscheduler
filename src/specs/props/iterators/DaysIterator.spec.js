
'use strict';

const DaysIterator = require('./../../../props/iterators/DaysIterator');

describe('DaysIterator', function() {
  let iter;

  beforeEach(function() {
    iter = new DaysIterator();
  });

  it('should iterate through days of week', function() {
    expect(iter.isDone()).toBe(false);
    expect(iter.next()).toEqual({ day: 1 });
    expect(iter.isDone()).toBe(false);
    expect(iter.current()).toEqual({ day: 2 });
    expect(iter.next()).toEqual({ day: 2 });
    expect(iter.isDone()).toBe(false);
    expect(iter.next()).toEqual({ day: 3 });
    expect(iter.isDone()).toBe(false);
    expect(iter.next()).toEqual({ day: 4 });
    expect(iter.isDone()).toBe(false);
    expect(iter.next()).toEqual({ day: 5 });
    expect(iter.isDone()).toBe(false);
    expect(iter.current()).toEqual({ day: 6 });
    expect(iter.next()).toEqual({ day: 6 });
    expect(iter.isDone()).toBe(false);
    expect(iter.current()).toEqual({ day: 7 });
    expect(iter.next()).toEqual({ day: 7 });
    expect(iter.isDone()).toBe(true);
    expect(iter.current()).toBe(null);
    expect(iter.next()).toBe(null);
  });

  it('should reset iterator', function() {
    iter.next();
    expect(iter.current()).toEqual({ day: 2 });
    iter.reset();
    expect(iter.current()).toEqual({ day: 1 });
  });
});
