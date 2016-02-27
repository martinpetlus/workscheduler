
'use strict';

const WorkingPeriodProperties = require('../../props/WorkingPeriodProperties');

describe('WorkingPeriodProperties', function() {
  let iter, current;

  beforeEach(function() {
    current = {employee: 1, week: 1, day: 1};

    iter = {
      current() {
        return current;
      }
    };
  });

  describe('index', function() {
    let props;

    describe('2 weeks period, 2 employees', function() {
      beforeEach(function() {
        props = new WorkingPeriodProperties({
          weeks: 2,
          employees: 2
        });
      });

      it('should compute index of shift', function() {
        expect(props.shiftIndex(iter)).toBe(0);
        current.day = 3;
        expect(props.shiftIndex(iter)).toBe(2);
        current.day = 7;
        expect(props.shiftIndex(iter)).toBe(6);
        current.week = 2;
        current.day = 1;
        expect(props.shiftIndex(iter)).toBe(7);
        current.day = 7;
        expect(props.shiftIndex(iter)).toBe(13);
        current.employee = 2;
        current.week = 1;
        current.day = 1;
        expect(props.shiftIndex(iter)).toBe(14);
        current.day = 7;
        expect(props.shiftIndex(iter)).toBe(20);
      });
    });

    describe('4 weeks period, 3 employees', function() {
      beforeEach(function() {
        props = new WorkingPeriodProperties({
          weeks: 4,
          employees: 3
        });
      });

      it('should compute index of shift', function() {
        expect(props.shiftIndex(iter)).toBe(0);
        current.employee = 2;
        expect(props.shiftIndex(iter)).toBe(28);
      });
    });
  });
});
