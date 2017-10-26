package workscheduler.schedule.fitnesses;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;

import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import static org.powermock.api.easymock.PowerMock.createMock;
import static org.powermock.api.easymock.PowerMock.replay;

import static org.easymock.EasyMock.expect;

import workscheduler.genetics.Chromosome;
import workscheduler.schedule.Day;
import workscheduler.schedule.options.EmployeesOption;
import workscheduler.schedule.options.MaxWorkdaysPerWeekOption;
import workscheduler.schedule.options.ScheduleOptions;
import workscheduler.schedule.ScheduleProperties;
import workscheduler.schedule.options.WeeksOption;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ ScheduleOptions.class })
public final class MaxWorkdaysPerWeekFitnessTest {
  private ScheduleOptions optsMock;

  private ScheduleProperties props;

  private Fitness fitness;

  private Chromosome chr;

  @Before
  public void setUp() {
    optsMock = createMock(ScheduleOptions.class);

    expect(optsMock.forClass(WeeksOption.class)).andReturn(new WeeksOption(4)).anyTimes();
    expect(optsMock.forClass(EmployeesOption.class)).andReturn(new EmployeesOption(3)).anyTimes();
    expect(optsMock.forClass(MaxWorkdaysPerWeekOption.class))
      .andReturn(new MaxWorkdaysPerWeekOption(5))
      .anyTimes();
    replay(optsMock);

    props = new ScheduleProperties(optsMock);
    fitness = new MaxWorkdaysPerWeekFitness(props);
    chr = new Chromosome(props.getLength(), null);
  }

  @Test
  public void shouldComputeCorrectFitnessForOneEmployeeExceedingLimit() {
    chr.setGene(props.getShiftIndex(1, 1, Day.MONDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.TUESDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.WEDNESDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.THURSDAY), true);
    assertEquals(fitness.score(chr), 0);

    chr.setGene(props.getShiftIndex(1, 1, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.SATURDAY), true);
    assertEquals(fitness.score(chr), -1);

    chr.setGene(props.getShiftIndex(1, 4, Day.MONDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.TUESDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.WEDNESDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.THURSDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.SATURDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.SUNDAY), true);
    assertEquals(fitness.score(chr), -3);
  }

  @Test
  public void shouldComputeCorrectFitnessForTwoEmployeesExceedingLimit() {
    chr.setGene(props.getShiftIndex(1, 1, Day.MONDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.TUESDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.WEDNESDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.THURSDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.MONDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.TUESDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.WEDNESDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.THURSDAY), true);
    assertEquals(fitness.score(chr), 0);

    chr.setGene(props.getShiftIndex(1, 1, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.SATURDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.SATURDAY), true);
    assertEquals(fitness.score(chr), -2);
  }
}
