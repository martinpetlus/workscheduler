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

import workschedule.genetics.Chromosome;
import workschedule.schedule.Day;
import workschedule.schedule.options.EmployeesOption;
import workschedule.schedule.options.ScheduleOptions;
import workschedule.schedule.ScheduleProperties;
import workschedule.schedule.options.WeeksOption;
import workschedule.schedule.options.WorkDaysOption;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ ScheduleOptions.class, EmployeesOption.class })
public final class WorkDaysFitnessTest {
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
    expect(optsMock.forClass(WorkDaysOption.class)).andReturn(new WorkDaysOption(6)).anyTimes();
    expect(optsMock.forClass(EmployeesOption.class)).andReturn(employeesOptionMock).anyTimes();
    replay(optsMock);

    props = new ScheduleProperties(optsMock);
    fitness = new WorkDaysFitness(props);
  }

  private void setUpEmployees(final int employees) {
    expect(employeesOptionMock.get()).andReturn(employees).anyTimes();
    replay(employeesOptionMock);

    chr = new Chromosome(props.getLength(), null);
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
