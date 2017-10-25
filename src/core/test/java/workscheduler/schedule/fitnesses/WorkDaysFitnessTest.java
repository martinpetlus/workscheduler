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
import workscheduler.schedule.options.ScheduleOptions;
import workscheduler.schedule.ScheduleProperties;
import workscheduler.schedule.options.WeeksOption;
import workscheduler.schedule.options.WorkdaysOption;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ ScheduleOptions.class, EmployeesOption.class })
public final class WorkdaysFitnessTest {
  private ScheduleOptions optsMock;

  private EmployeesOption employeesOptionMock;

  private ScheduleProperties props;

  private Fitness fitness;

  private Chromosome chr;

  @Before
  public void setUp() {
    optsMock = createMock(ScheduleOptions.class);
    employeesOptionMock = createMock(EmployeesOption.class);

    expect(optsMock.forClass(WeeksOption.class)).andReturn(new WeeksOption(4)).anyTimes();
    expect(optsMock.forClass(WorkdaysOption.class)).andReturn(new WorkdaysOption(6)).anyTimes();
    expect(optsMock.forClass(EmployeesOption.class)).andReturn(employeesOptionMock).anyTimes();
    replay(optsMock);

    props = new ScheduleProperties(optsMock);
    fitness = new WorkdaysFitness(props);
  }

  private void setUpEmployees(final int employees) {
    expect(employeesOptionMock.get()).andReturn(employees).anyTimes();
    replay(employeesOptionMock);

    chr = new Chromosome(props.getLength(), null);
  }

  @Test
  public void shouldComputeCorrectFitnessForOneEmployee() {
    setUpEmployees(1);

    assertEquals(fitness.score(chr), -6);

    chr.setGene(props.getShiftIndex(1, 1, Day.MONDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.TUESDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.WEDNESDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.THURSDAY), true);
    assertEquals(fitness.score(chr), -2);

    chr.setGene(props.getShiftIndex(1, 1, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.SATURDAY), true);
    assertEquals(fitness.score(chr), 0);

    chr.setGene(props.getShiftIndex(1, 1, Day.SUNDAY), true);
    assertEquals(fitness.score(chr), -1);
  }

  @Test
  public void shouldComputeCorrectFitnessForTwoEmployees() {
    setUpEmployees(2);

    assertEquals(fitness.score(chr), -12);

    chr.setGene(props.getShiftIndex(1, 1, Day.MONDAY), true);
    chr.setGene(props.getShiftIndex(1, 1, Day.WEDNESDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.TUESDAY), true);
    chr.setGene(props.getShiftIndex(2, 1, Day.THURSDAY), true);
    assertEquals(fitness.score(chr), -8);

    chr.setGene(props.getShiftIndex(1, 2, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(1, 2, Day.SATURDAY), true);
    chr.setGene(props.getShiftIndex(2, 2, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(2, 2, Day.SATURDAY), true);
    assertEquals(fitness.score(chr), -4);

    chr.setGene(props.getShiftIndex(1, 3, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(1, 3, Day.SATURDAY), true);
    chr.setGene(props.getShiftIndex(2, 3, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(2, 3, Day.SATURDAY), true);
    assertEquals(fitness.score(chr), 0);

    chr.setGene(props.getShiftIndex(1, 4, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(1, 4, Day.SATURDAY), true);
    chr.setGene(props.getShiftIndex(2, 4, Day.FRIDAY), true);
    chr.setGene(props.getShiftIndex(2, 4, Day.SATURDAY), true);
    assertEquals(fitness.score(chr), -4);
  }
}
