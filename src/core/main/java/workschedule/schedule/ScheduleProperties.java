package workschedule.schedule;

import java.util.NoSuchElementException;

import workschedule.schedule.options.EmployeesOption;
import workschedule.schedule.options.ScheduleOptions;
import workschedule.schedule.options.WeeksOption;

public final class ScheduleProperties {
    private static final int DAYS_IN_WEEK = Day.values().length;

    private final EmployeesOption employees;

    private final WeeksOption weeks;

    private final ScheduleOptions opts;

    public ScheduleProperties(final ScheduleOptions opts) {
        this.opts = opts;
        this.employees = this.opts.forClass(EmployeesOption.class);
        this.weeks = this.opts.forClass(WeeksOption.class);
    }

    public int getLength() {
        return employees.get() * DAYS_IN_WEEK * weeks.get();
    }

    public ScheduleOptions getOpts() {
        return opts;
    }

    public int getShiftIndex(final int employee, final int week, final Day day) {
        return (employee - 1) * DAYS_IN_WEEK * weeks.get() +
            (week - 1) * DAYS_IN_WEEK +
            (day.numeric() - 1);
    }

    public int getShiftIndex(final int employee, final ScheduleDay day) {
        return getShiftIndex(employee, day.getWeek(), day.getDay());
    }

    public ResettableIterator<Day> days() {
        return new DayIterator();
    }

    public ResettableIterator<Integer> weeks() {
        return new WeekIterator();
    }

    public ResettableIterator<Integer> employees() {
        return new EmployeeIterator();
    }

    public ResettableIterator<ScheduleDay> scheduleDays() {
        return new ScheduleDayIterator();
    }

    private final class ScheduleDayIterator implements  ResettableIterator<ScheduleDay> {

        private final ResettableIterator<Day> dayIterator = days();

        private final ResettableIterator<Integer> weekIterator = weeks();

        private Integer nextWeek;

        @Override
        public void reset() {
            dayIterator.reset();
            weekIterator.reset();
            nextWeek = null;
        }

        @Override
        public boolean hasNext() {
            return dayIterator.hasNext() || weekIterator.hasNext();
        }

        @Override
        public ScheduleDay next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }

            if (nextWeek == null) {
                nextWeek = weekIterator.next();
            }

            if (!dayIterator.hasNext()) {
                dayIterator.reset();
                nextWeek = weekIterator.next();
            }

            return new ScheduleDay(dayIterator.next(), nextWeek);
        }
    }

    private final class EmployeeIterator implements ResettableIterator<Integer> {

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
            if (employee > ScheduleProperties.this.employees.get()) {
                employee = -1;
            }

            return next;
        }

        @Override
        public void reset() {
            employee = 1;
        }
    }

    private final class WeekIterator implements ResettableIterator<Integer> {

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
            if (week > ScheduleProperties.this.weeks.get()) {
                week = -1;
            }

            return next;
        }

        @Override
        public void reset() {
            week = 1;
        }
    }

    private static final class DayIterator implements ResettableIterator<Day> {

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

        @Override
        public void reset() {
            day = Day.MONDAY;
        }
    }
}
