package workschedule.schedule;

import java.util.Iterator;
import java.util.NoSuchElementException;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import org.junit.rules.ExpectedException;

public final class SchedulePropertiesTest {

    private ScheduleProperties props;

    @Rule
    public final ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUp() {
        props = new ScheduleProperties();
    }

    @Test
    public void daysIteratorShouldIterateThroughDaysOfWeek() {
        final Iterator<Day> iterator = props.days();

        assertTrue(iterator.hasNext());
        assertEquals(Day.MONDAY, iterator.next());

        assertTrue(iterator.hasNext());
        assertEquals(Day.TUESDAY, iterator.next());

        assertTrue(iterator.hasNext());
        assertEquals(Day.WEDNESDAY, iterator.next());

        assertTrue(iterator.hasNext());
        assertEquals(Day.THURSDAY, iterator.next());

        assertTrue(iterator.hasNext());
        assertEquals(Day.FRIDAY, iterator.next());

        assertTrue(iterator.hasNext());
        assertEquals(Day.SATURDAY, iterator.next());

        assertTrue(iterator.hasNext());
        assertEquals(Day.SUNDAY, iterator.next());

        assertFalse(iterator.hasNext());
        thrown.expect(NoSuchElementException.class);
        iterator.next();
    }
}
