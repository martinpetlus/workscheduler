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
import workschedule.schedule.options.EmployeesOption;
import workschedule.schedule.options.ScheduleOptions;
import workschedule.schedule.ScheduleProperties;
import workschedule.schedule.options.SuccessiveWeekendsOption;
import workschedule.schedule.options.WeeksOption;

@RunWith(PowerMockRunner.class)
@PrepareForTest({
    ScheduleOptions.class,
    EmployeesOption.class,
    SuccessiveWeekendsOption.class,
    WeeksOption.class
})
public final class SuccessiveWeekendsFitnessTest {
    private ScheduleOptions optsMock;

    private EmployeesOption employeesOptionMock;

    private WeeksOption weeksOptionMock;

    private SuccessiveWeekendsOption successiveWeekendsOptionMock;

    private ScheduleProperties props;

    private Fitness fitness;

    private Chromosome chr;

    @Before
    public void setUp() {
        optsMock = createMock(ScheduleOptions.class);
        employeesOptionMock = createMock(EmployeesOption.class);
        successiveWeekendsOptionMock = createMock(SuccessiveWeekendsOption.class);
        weeksOptionMock = createMock(WeeksOption.class);

        expect(optsMock.forClass(EmployeesOption.class)).andReturn(employeesOptionMock).anyTimes();
        expect(optsMock.forClass(SuccessiveWeekendsOption.class)).andReturn(successiveWeekendsOptionMock).anyTimes();
        expect(optsMock.forClass(WeeksOption.class)).andReturn(weeksOptionMock).anyTimes();
        replay(optsMock);

        props = new ScheduleProperties(optsMock);
        fitness = new SuccessiveWeekendsFitness(props);
    }

    private void setUpOther(final int employees, final int weeks, final int free, final int work) {
        expect(employeesOptionMock.get()).andReturn(employees).anyTimes();
        replay(employeesOptionMock);

        expect(weeksOptionMock.get()).andReturn(weeks).anyTimes();
        replay(weeksOptionMock);

        expect(successiveWeekendsOptionMock.getSuccessiveWork()).andReturn(work).anyTimes();
        expect(successiveWeekendsOptionMock.getSuccessiveFree()).andReturn(free).anyTimes();
        replay(successiveWeekendsOptionMock);

        chr = new Chromosome(props.getLength(), null);
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
