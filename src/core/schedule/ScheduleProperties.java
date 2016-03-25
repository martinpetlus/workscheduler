package core.schedule;

import java.util.Iterator;
import java.util.NoSuchElementException;

public final class ScheduleProperties {

    public Iterator<Day> days() {
        return new DayIterator();
    }

    private final class DayIterator implements Iterator<Day> {

        private Day day = Day.MONDAY;

        @Override
        public Day next() {
            if (day == null) {
                throw new NoSuchElementException();
            }

            final Day next = day;

            // Advance to the following day
            day = day.following();

            // Terminate iterator at the start of next week
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
