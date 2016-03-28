package workschedule.schedule;

import java.util.Iterator;
import java.util.NoSuchElementException;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import static org.easymock.EasyMock.expect;

import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.core.classloader.annotations.PrepareForTest;
import static org.powermock.api.easymock.PowerMock.createMock;
import static org.powermock.api.easymock.PowerMock.replay;
import static org.powermock.api.easymock.PowerMock.verify;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ ScheduleOptions.class })
public final class SchedulePropertiesTest {

    private ScheduleProperties props;

    private ScheduleOptions optsMock;

    @Rule
    public final ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUp() {
        optsMock = createMock(ScheduleOptions.class);
        props = new ScheduleProperties(optsMock);
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

    @Test
    public void weeksIteratorShouldIterateThroughWeeksOfPeriod() {
        final Iterator<Integer> iterator = props.weeks();

        expect(optsMock.getWeeks()).andReturn(2).anyTimes();

        replay(optsMock);

        assertTrue(iterator.hasNext());
        assertEquals(1, iterator.next().intValue());

        assertTrue(iterator.hasNext());
        assertEquals(2, iterator.next().intValue());

        assertFalse(iterator.hasNext());
        thrown.expect(NoSuchElementException.class);
        iterator.next();

        verify(optsMock);
    }
}
