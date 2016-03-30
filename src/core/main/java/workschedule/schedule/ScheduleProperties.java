package workschedule.schedule;

import java.util.Iterator;
import java.util.NoSuchElementException;

public final class ScheduleProperties {

    private final ScheduleOptions opts;

    public ScheduleProperties(final ScheduleOptions opts) {
        this.opts = opts;
    }

    public Iterator<Day> days() {
        return new DayIterator();
    }

    public Iterator<Integer> weeks() {
        return new WeekIterator();
    }

    public Iterator<Integer> employees() {
        return new EmployeeIterator();
    }

    private final class EmployeeIterator implements Iterator<Integer> {

        private int employee = 1;

        @Override
        public boolean hasNext() {
            return employee > 0;
        }

        @Override
        public Integer next() {
            if (employee < 0) {
                throw new NoSuchElementException();
            }

            final int next = employee;

            employee += 1;

            // Iterate only from 1 to number of employees
            if (employee > ScheduleProperties.this.opts.getEmployees()) {
                employee = -1;
            }

            return next;
        }
    }

    private final class WeekIterator implements Iterator<Integer> {

        private int week = 1;

        @Override
        public boolean hasNext() {
            return week > 0;
        }

        @Override
        public Integer next() {
            if (week < 0) {
                throw new NoSuchElementException();
            }

            final int next = week;

            week += 1;

            // Iterate only from 1 to number of weeks in period
            if (week > ScheduleProperties.this.opts.getWeeks()) {
                week = -1;
            }

            return next;
        }
    }

    private static final class DayIterator implements Iterator<Day> {

        private Day day = Day.MONDAY;

        @Override
        public Day next() {
            if (day == null) {
                throw new NoSuchElementException();
            }

            final Day next = day;

            // Advance to the following day
            day = day.following();

            // Iterate only from monday to sunday
            if (day == Day.MONDAY) {
                day = null;
            }

            return next;
        }

        @Override
        public boolean hasNext() {
            return day != null;
        }
    }
}
