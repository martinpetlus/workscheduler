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
import workschedule.schedule.options.MinEmployeesAtWorkOption;
import workschedule.schedule.options.ScheduleOptions;
import workschedule.schedule.ScheduleProperties;
import workschedule.schedule.options.WeeksOption;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ ScheduleOptions.class })
public final class MinEmployeesAtWorkTest {
    private ScheduleOptions optsMock;

    private ScheduleProperties props;

    private Fitness fitness;

    private Chromosome chr;

    @Before
    public void setUp() {
        optsMock = createMock(ScheduleOptions.class);

        expect(optsMock.forClass(MinEmployeesAtWorkOption.class))
            .andReturn(new MinEmployeesAtWorkOption(1))
            .anyTimes();
        expect(optsMock.forClass(WeeksOption.class)).andReturn(new WeeksOption(4)).anyTimes();
        expect(optsMock.forClass(EmployeesOption.class)).andReturn(new EmployeesOption(3)).anyTimes();
        replay(optsMock);

        props = new ScheduleProperties(optsMock);
        fitness = new MinEmployeesAtWork(props);
        chr = new Chromosome(props.getLength(), null);
    }

    @Test
    public void shouldComputeCorrectFitness() {
        assertEquals(fitness.fitness(chr), -28);

        chr.setParam(props.getShiftIndex(1, 1, Day.FRIDAY), true);
        assertEquals(fitness.fitness(chr), -27);

        chr.setParam(props.getShiftIndex(2, 1, Day.FRIDAY), true);
        assertEquals(fitness.fitness(chr), -27);

        chr.setParam(props.getShiftIndex(2, 1, Day.SATURDAY), true);
        assertEquals(fitness.fitness(chr), -26);
    }
}
