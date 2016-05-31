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
import workscheduler.schedule.options.MaxSuccessiveWorkDaysOption;
import workscheduler.schedule.options.ScheduleOptions;
import workscheduler.schedule.ScheduleProperties;
import workscheduler.schedule.options.WeeksOption;

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
    chr.setGene(props.getShiftIndex(1, 1, Day.MONDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.TUESDAY), true);
    assertEquals(fitness.score(chr), 0);

    chr.setGene(props.getShiftIndex(1, 1, Day.WEDNESDAY), true);
    assertEquals(fitness.score(chr), 0);

    chr.setGene(props.getShiftIndex(1, 1, Day.THURSDAY), true);
    assertEquals(fitness.score(chr), -1);

    chr.setGene(props.getShiftIndex(1, 1, Day.FRIDAY), true);
    assertEquals(fitness.score(chr), -2);

    chr.setGene(props.getShiftIndex(1, 3, Day.MONDAY), true);
    chr.setGene(props.getShiftIndex(1, 3, Day.TUESDAY), true);
    chr.setGene(props.getShiftIndex(1, 3, Day.WEDNESDAY), true);
    chr.setGene(props.getShiftIndex(1, 3, Day.THURSDAY), true);
    chr.setGene(props.getShiftIndex(1, 3, Day.FRIDAY), true);
    assertEquals(fitness.score(chr), -4);
  }

  @Test
  public void shouldComputeCorrectFitnessForSuccessiveDaysInMiddleOfScheduleWithTwoEmployees() {
    chr.setGene(props.getShiftIndex(1, 1, Day.MONDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.TUESDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.MONDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.TUESDAY), true);
    assertEquals(fitness.score(chr), 0);

    chr.setGene(props.getShiftIndex(1, 1, Day.WEDNESDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.THURSDAY), true);
    assertEquals(fitness.score(chr), -1);

    chr.setGene(props.getShiftIndex(2, 1, Day.WEDNESDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.THURSDAY), true);
    assertEquals(fitness.score(chr), -2);

    chr.setGene(props.getShiftIndex(2, 1, Day.FRIDAY), true);
    assertEquals(fitness.score(chr), -3);
  }

  @Test
  public void shouldComputeCorrectFitnessForSuccessiveDaysAtTheEndOfScheduleWithOneEmployee() {
    chr.setGene(props.getShiftIndex(1, 4, Day.THURSDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.SATURDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.SUNDAY), true);
    assertEquals(fitness.score(chr), -1);
  }

  @Test
  public void shouldComputeCorrectFitnessForSuccessiveDaysAtTheEndOfScheduleWithTwoEmployees() {
    chr.setGene(props.getShiftIndex(1, 4, Day.THURSDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.SATURDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.SUNDAY), true);

    chr.setGene(props.getShiftIndex(2, 4, Day.THURSDAY), true);
    chr.setGene(props.getShiftIndex(2, 4, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(2, 4, Day.SATURDAY), true);
    chr.setGene(props.getShiftIndex(2, 4, Day.SUNDAY), true);

    assertEquals(fitness.score(chr), -2);
  }
}
