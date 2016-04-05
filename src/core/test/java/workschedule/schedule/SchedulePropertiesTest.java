package workschedule.schedule;

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
        final ResettableIterator<Day> iterator = props.days();

        assertTrue(iterator.hasNext());
        assertEquals(Day.MONDAY, iterator.next());

        assertTrue(iterator.hasNext());
        assertEquals(Day.TUESDAY, iterator.next());

        assertTrue(iterator.hasNext());
        assertEquals(Day.WEDNESDAY, iterator.next());

        // Test iterator's reset method
        iterator.reset();
        assertTrue(iterator.hasNext());
        assertEquals(Day.MONDAY, iterator.next());
        iterator.next();
        iterator.next();

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
        final ResettableIterator<Integer> iterator = props.weeks();

        expect(optsMock.getWeeks()).andReturn(2).anyTimes();

        replay(optsMock);

        assertTrue(iterator.hasNext());
        assertEquals(1, iterator.next().intValue());

        assertTrue(iterator.hasNext());
        assertEquals(2, iterator.next().intValue());

        // Test iterator's reset method
        iterator.reset();
        assertTrue(iterator.hasNext());
        assertEquals(1, iterator.next().intValue());
        iterator.next();

        assertFalse(iterator.hasNext());
        thrown.expect(NoSuchElementException.class);
        iterator.next();
    }

    @Test
    public void employeesIteratorShouldIterateThroughAllEmployees() {
        final ResettableIterator<Integer> iterator = props.employees();

        expect(optsMock.getEmployees()).andReturn(2).anyTimes();

        replay(optsMock);

        assertTrue(iterator.hasNext());
        assertEquals(1, iterator.next().intValue());

        assertTrue(iterator.hasNext());
        assertEquals(2, iterator.next().intValue());

        // Test iterator's reset method
        iterator.reset();
        assertTrue(iterator.hasNext());
        assertEquals(1, iterator.next().intValue());
        iterator.next();

        assertFalse(iterator.hasNext());
        thrown.expect(NoSuchElementException.class);
        iterator.next();
    }

    @Test
    public void scheduleDaysIteratorShouldIterateThroughDaysOfSchedule() {
        final ResettableIterator<ScheduleDay> iterator = props.scheduleDays();

        ScheduleDay next;

        expect(optsMock.getWeeks()).andReturn(2).anyTimes();

        replay(optsMock);

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.MONDAY, next.getDay());
        assertEquals(1, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.TUESDAY, next.getDay());
        assertEquals(1, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.WEDNESDAY, next.getDay());
        assertEquals(1, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.THURSDAY, next.getDay());
        assertEquals(1, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.FRIDAY, next.getDay());
        assertEquals(1, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.SATURDAY, next.getDay());
        assertEquals(1, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.SUNDAY, next.getDay());
        assertEquals(1, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.MONDAY, next.getDay());
        assertEquals(2, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.TUESDAY, next.getDay());
        assertEquals(2, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.WEDNESDAY, next.getDay());
        assertEquals(2, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.THURSDAY, next.getDay());
        assertEquals(2, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.FRIDAY, next.getDay());
        assertEquals(2, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.SATURDAY, next.getDay());
        assertEquals(2, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.SUNDAY, next.getDay());
        assertEquals(2, next.getWeek().intValue());

        assertFalse(iterator.hasNext());
        thrown.expect(NoSuchElementException.class);
        iterator.next();
    }

    @Test
    public void scheduleDaysIteratorShouldBeResettable() {
        final ResettableIterator<ScheduleDay> iterator = props.scheduleDays();

        ScheduleDay next;

        expect(optsMock.getWeeks()).andReturn(2).anyTimes();

        replay(optsMock);

        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();

        iterator.reset();

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.MONDAY, next.getDay());
        assertEquals(1, next.getWeek().intValue());

        assertTrue(iterator.hasNext());
        next = iterator.next();
        assertEquals(Day.TUESDAY, next.getDay());
        assertEquals(1, next.getWeek().intValue());
    }

    @Test
    public void shouldComputeIndexOfShiftWithTwoEmployeesAndTwoWeeksSchedule() {
        expect(optsMock.getEmployees()).andReturn(2).anyTimes();
        expect(optsMock.getWeeks()).andReturn(2).anyTimes();

        replay(optsMock);

        assertEquals(props.getShiftIndex(1, 1, Day.MONDAY), 0);
        assertEquals(props.getShiftIndex(1, 1, Day.WEDNESDAY), 2);
        assertEquals(props.getShiftIndex(1, 1, Day.SUNDAY), 6);
        assertEquals(props.getShiftIndex(1, 2, Day.MONDAY), 7);
        assertEquals(props.getShiftIndex(1, 2, Day.SUNDAY), 13);
        assertEquals(props.getShiftIndex(2, 1, Day.MONDAY), 14);
        assertEquals(props.getShiftIndex(2, 1, Day.SUNDAY), 20);
    }

    @Test
    public void shouldComputeIndexOfShiftWithThreeEmployeesAndFourWeeksSchedule() {
        expect(optsMock.getEmployees()).andReturn(3).anyTimes();
        expect(optsMock.getWeeks()).andReturn(4).anyTimes();

        replay(optsMock);

        assertEquals(props.getShiftIndex(1, 1, Day.MONDAY), 0);
        assertEquals(props.getShiftIndex(2, 1, Day.MONDAY), 28);
    }
}
