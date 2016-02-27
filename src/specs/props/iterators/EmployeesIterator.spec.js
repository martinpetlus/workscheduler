
'use strict';

const EmployeesIterator = require('./../../../props/iterators/EmployeesIterator');

describe('EmployeesIterator', function() {
  let iter;

  beforeEach(function() {
    iter = new EmployeesIterator({ employees: 3 });
  });

  it('should iterate through employees', function() {
    expect(iter.isDone()).toBe(false);
    expect(iter.next()).toEqual({ employee: 1 });
    expect(iter.isDone()).toBe(false);
    expect(iter.next()).toEqual({ employee: 2 });
    expect(iter.isDone()).toBe(false);
    expect(iter.next()).toEqual({ employee: 3 });
    expect(iter.isDone()).toBe(true);
    expect(iter.next()).toBe(null);
  });
});
