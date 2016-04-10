package workschedule.schedule.fitnesses;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;

import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import static org.powermock.api.easymock.PowerMock.createMock;
import static org.powermock.api.easymock.PowerMock.replay;

import static org.easymock.EasyMock.expect;

import workschedule.Chromosome;
import workschedule.schedule.Day;
import workschedule.schedule.ScheduleOptions;
import workschedule.schedule.ScheduleProperties;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ ScheduleOptions.class })
public final class SuccessiveWeekendsTest {
    private ScheduleOptions optsMock;

    private ScheduleOptions.WeekendsOptions weekendsOptsMock;

    private ScheduleProperties props;

    private Fitness fitness;

    private Chromosome chr;

    @Before
    public void setUp() {
        optsMock = createMock(ScheduleOptions.class);
        weekendsOptsMock = createMock(ScheduleOptions.WeekendsOptions.class);

        props = new ScheduleProperties(optsMock);
        fitness = new SuccessiveWeekends(props);
    }

    private void setUpOther(final int employees, final int weeks, final int successiveFree, final int successiveWork) {
        expect(optsMock.getEmployees()).andReturn(employees).anyTimes();
        expect(optsMock.getWeeks()).andReturn(weeks).anyTimes();
        expect(optsMock.getWeekendsOptions()).andReturn(weekendsOptsMock).anyTimes();

        expect(weekendsOptsMock.getSuccessiveFree()).andReturn(successiveFree).anyTimes();
        expect(weekendsOptsMock.getSuccessiveWork()).andReturn(successiveWork).anyTimes();

        replay(optsMock);
        replay(weekendsOptsMock);

        chr = new Chromosome(props.getLength());
    }

    @Test
    public void shouldComputeCorrectFitnessWithFirstTwoFreeWeekendsInSchedule() {
        setUpOther(1, 4, 2, 2);

        chr.setParam(props.getShiftIndex(1, 3, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 3, Day.SUNDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SUNDAY), true);
        assertEquals(fitness.fitness(chr), 0);
    }

    @Test
    public void shouldComputeCorrectFitnessWithLastTwoFreeWeekendsInSchedule() {
        setUpOther(1, 4, 2, 2);

        chr.setParam(props.getShiftIndex(1, 1, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 1, Day.SUNDAY), true);
        chr.setParam(props.getShiftIndex(1, 2, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 2, Day.SUNDAY), true);
        assertEquals(fitness.fitness(chr), 0);
    }

    @Test
    public void shouldComputeCorrectFitnessForLastWorkWeekendInSchedule() {
        setUpOther(1, 4, 2, 2);

        chr.setParam(props.getShiftIndex(1, 4, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SUNDAY), true);
        assertEquals(fitness.fitness(chr), -2);
    }

    @Test
    public void shouldComputeCorrectFitnessWithTwoWorkWeekendsInMiddleOfSchedule() {
        setUpOther(1, 4, 2, 2);

        chr.setParam(props.getShiftIndex(1, 2, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 2, Day.SUNDAY), true);
        chr.setParam(props.getShiftIndex(1, 3, Day.SATURDAY), true);
        assertEquals(fitness.fitness(chr), -5);
    }

    @Test
    public void shouldComputeCorrectFitnessWithTwoEmployees() {
        setUpOther(2, 4, 2, 2);

        assertEquals(fitness.fitness(chr), -8);

        chr.setParam(props.getShiftIndex(1, 3, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 3, Day.SUNDAY), true);
        chr.setParam(props.getShiftIndex(2, 4, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(2, 4, Day.SUNDAY), true);
        assertEquals(fitness.fitness(chr), -4);

        chr.setParam(props.getShiftIndex(1, 4, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SUNDAY), true);
        chr.setParam(props.getShiftIndex(2, 3, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(2, 3, Day.SUNDAY), true);
        assertEquals(fitness.fitness(chr), 0);
    }

    @Test
    public void shouldComputeCorrectFitnessForEightWeekSchedule() {
        setUpOther(1, 8, 3, 2);

        chr.setParam(props.getShiftIndex(1, 2, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 2, Day.SUNDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SUNDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SUNDAY), true);
        chr.setParam(props.getShiftIndex(1, 7, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 7, Day.SUNDAY), true);
        chr.setParam(props.getShiftIndex(1, 8, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 8, Day.SUNDAY), true);
        assertEquals(fitness.fitness(chr), -8);
    }
}
