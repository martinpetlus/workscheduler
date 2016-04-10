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
public final class WorkDaysTest {
    private ScheduleOptions optsMock;

    private ScheduleProperties props;

    private Fitness fitness;

    private Chromosome chr;

    @Before
    public void setUp() {
        optsMock = createMock(ScheduleOptions.class);
        props = new ScheduleProperties(optsMock);
        fitness = new WorkDays(props);

        expect(optsMock.getWeeks()).andReturn(4).anyTimes();
        expect(optsMock.getWorkDays()).andReturn(6).anyTimes();
    }

    private void setUpEmployees(final int employees) {
        expect(optsMock.getEmployees()).andReturn(employees).anyTimes();

        replay(optsMock);

        chr = new Chromosome(props.getLength());
    }

    @Test
    public void shouldComputeCorrectFitnessForOneEmployee() {
        setUpEmployees(1);

        assertEquals(fitness.fitness(chr), -6);

        chr.setParam(props.getShiftIndex(1, 1, Day.MONDAY), true);
        chr.setParam(props.getShiftIndex(1, 1, Day.TUESDAY), true);
        chr.setParam(props.getShiftIndex(1, 1, Day.WEDNESDAY), true);
        chr.setParam(props.getShiftIndex(1, 1, Day.THURSDAY), true);
        assertEquals(fitness.fitness(chr), -2);

        chr.setParam(props.getShiftIndex(1, 1, Day.FRIDAY), true);
        chr.setParam(props.getShiftIndex(1, 1, Day.SATURDAY), true);
        assertEquals(fitness.fitness(chr), 0);

        chr.setParam(props.getShiftIndex(1, 1, Day.SUNDAY), true);
        assertEquals(fitness.fitness(chr), -1);
    }

    @Test
    public void shouldComputeCorrectFitnessForTwoEmployees() {
        setUpEmployees(2);

        assertEquals(fitness.fitness(chr), -12);

        chr.setParam(props.getShiftIndex(1, 1, Day.MONDAY), true);
        chr.setParam(props.getShiftIndex(1, 1, Day.WEDNESDAY), true);
        chr.setParam(props.getShiftIndex(2, 1, Day.TUESDAY), true);
        chr.setParam(props.getShiftIndex(2, 1, Day.THURSDAY), true);
        assertEquals(fitness.fitness(chr), -8);

        chr.setParam(props.getShiftIndex(1, 2, Day.FRIDAY), true);
        chr.setParam(props.getShiftIndex(1, 2, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(2, 2, Day.FRIDAY), true);
        chr.setParam(props.getShiftIndex(2, 2, Day.SATURDAY), true);
        assertEquals(fitness.fitness(chr), -4);

        chr.setParam(props.getShiftIndex(1, 3, Day.FRIDAY), true);
        chr.setParam(props.getShiftIndex(1, 3, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(2, 3, Day.FRIDAY), true);
        chr.setParam(props.getShiftIndex(2, 3, Day.SATURDAY), true);
        assertEquals(fitness.fitness(chr), 0);

        chr.setParam(props.getShiftIndex(1, 4, Day.FRIDAY), true);
        chr.setParam(props.getShiftIndex(1, 4, Day.SATURDAY), true);
        chr.setParam(props.getShiftIndex(2, 4, Day.FRIDAY), true);
        chr.setParam(props.getShiftIndex(2, 4, Day.SATURDAY), true);
        assertEquals(fitness.fitness(chr), -4);
    }
}
