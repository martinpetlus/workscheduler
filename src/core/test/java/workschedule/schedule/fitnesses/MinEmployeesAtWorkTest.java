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
public final class MinEmployeesAtWorkTest {
    private ScheduleOptions optsMock;

    private ScheduleProperties props;

    private MinEmployeesAtWork fitness;

    @Before
    public void setUp() {
        optsMock = createMock(ScheduleOptions.class);
        props = new ScheduleProperties(optsMock);
        fitness = new MinEmployeesAtWork(props);
    }

    @Test
    public void shouldComputeCorrectFitness() {
        expect(optsMock.getWeeks()).andReturn(4).anyTimes();
        expect(optsMock.getEmployees()).andReturn(3).anyTimes();
        expect(optsMock.getMinEmployeesAtWork()).andReturn(1).anyTimes();

        replay(optsMock);

        final Chromosome chr = new Chromosome(props.getLength());

        assertEquals(fitness.fitness(chr), -28);

        chr.setParam(props.getShiftIndex(1, 1, Day.FRIDAY), true);
        assertEquals(fitness.fitness(chr), -27);

        chr.setParam(props.getShiftIndex(2, 1, Day.FRIDAY), true);
        assertEquals(fitness.fitness(chr), -27);

        chr.setParam(props.getShiftIndex(2, 1, Day.SATURDAY), true);
        assertEquals(fitness.fitness(chr), -26);
    }
}
