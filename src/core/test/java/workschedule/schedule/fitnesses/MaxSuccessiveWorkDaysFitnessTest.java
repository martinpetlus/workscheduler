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
import workschedule.schedule.options.MaxSuccessiveWorkDaysOption;
import workschedule.schedule.options.ScheduleOptions;
import workschedule.schedule.ScheduleProperties;
import workschedule.schedule.options.WeeksOption;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ ScheduleOptions.class })
public final class MaxSuccessiveWorkDaysFitnessTest {
    private ScheduleOptions optsMock;

    private ScheduleProperties props;

    private Fitness fitness;

    private Chromosome chr;

    @Before
    public void setUp() {
        optsMock = createMock(ScheduleOptions.class);

        expect(optsMock.forClass(WeeksOption.class)).andReturn(new WeeksOption(4)).anyTimes();
        expect(optsMock.forClass(EmployeesOption.class)).andReturn(new EmployeesOption(3)).anyTimes();
        expect(optsMock.forClass(MaxSuccessiveWorkDaysOption.class))
            .andReturn(new MaxSuccessiveWorkDaysOption(3))
            .anyTimes();
        replay(optsMock);

        props = new ScheduleProperties(optsMock);
        fitness = new MaxSuccessiveWorkDaysFitness(props);
        chr = new Chromosome(props.getLength(), null);
    }

    @Test
    public void shouldComputeCorrectFitnessForSuccessiveDaysInMiddleOfScheduleWithOneEmployee() {
        chr.setParam(props.getShiftIndex(1, 1, Day.MONDAY), true);
        chr.setParam(props.getShiftIndex(1, 1, Day.TUESDAY), true);
        assertEquals(fitness.fitness(chr), 0);

        chr.setParam(props.getShiftIndex(1, 1, Day.WEDNESDAY), true);
        assertEquals(fitness.fitness(chr), 0);

        chr.setParam(props.getShiftIndex(1, 1, Day.THURSDAY), true);
        assertEquals(fitness.fitness(chr), -1);

        chr.setParam(props.getShiftIndex(1, 1, Day.FRIDAY), true);
        assertEquals(fitness.fitness(chr), -2);

        chr.setParam(props.getShiftIndex(1, 3, Day.MONDAY), true);
        chr.setParam(props.getShiftIndex(1, 3, Day.TUESDAY), true);
        chr.setParam(props.getShiftIndex(1, 3, Day.WEDNESDAY), true);
        chr.setParam(props.getShiftIndex(1, 3, Day.THURSDAY), true);
        chr.setParam(props.getShiftIndex(1, 3, Day.FRIDAY), true);
        assertEquals(fitness.fitness(chr), -4);
    }

    @Test
    public void shouldComputeCorrectFitnessForSuccessiveDaysInMiddleOfScheduleWithTwoEmployees() {
        chr.setParam(props.getShiftIndex(1, 1, Day.MONDAY), true);
        chr.setParam(props.getShiftIndex(1, 1, Day.TUESDAY), true);
        chr.setParam(props.getShiftIndex(2, 1, Day.MONDAY), true);
        chr.setParam(props.getShiftIndex(2, 1, Day.TUESDAY), true);
        assertEquals(fitness.fitness(chr), 0);

        chr.setParam(props.getShiftIndex(1, 1, Day.WEDNESDAY), true);
        chr.setParam(props.getShiftIndex(1, 1, Day.THURSDAY), true);
        assertEquals(fitness.fitness(chr), -1);

        chr.setParam(props.getShiftIndex(2, 1, Day.WEDNESDAY), true);
        chr.setParam(props.getShiftIndex(2, 1, Day.THURSDAY), true);
        assertEquals(fitness.fitness(chr), -2);

        chr.setParam(props.getShiftIndex(2, 1, Day.FRIDAY), true);
        assertEquals(fitness.fitness(chr), -3);
    }

    @Test
    public void shouldComputeCorrectFitnessForSuccessiveDaysAtTheEndOfScheduleWithOneEmployee() {
        chr.setParam(props.getShiftIndex(1, 4, Day.THURSDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.FRIDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SUNDAY), true);
        assertEquals(fitness.fitness(chr), -1);
    }

    @Test
    public void shouldComputeCorrectFitnessForSuccessiveDaysAtTheEndOfScheduleWithTwoEmployees() {
        chr.setParam(props.getShiftIndex(1, 4, Day.THURSDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.FRIDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SUNDAY), true);

        chr.setParam(props.getShiftIndex(2, 4, Day.THURSDAY), true);
        chr.setParam(props.getShiftIndex(2, 4, Day.FRIDAY), true);
        chr.setParam(props.getShiftIndex(2, 4, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(2, 4, Day.SUNDAY), true);

        assertEquals(fitness.fitness(chr), -2);
    }
}