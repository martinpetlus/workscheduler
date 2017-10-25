package workscheduler.schedule.fitnesses;

import workscheduler.genetics.Chromosome;
import workscheduler.schedule.ScheduleDay;
import workscheduler.schedule.ScheduleProperties;
import workscheduler.schedule.options.ScheduleOptions;
import workscheduler.schedule.options.WorkDaysOption;

import java.util.Iterator;

public final class WorkDaysFitness extends AbstractFitness {
  final static FitnessProvider PROVIDER = new FitnessProvider() {
    @Override
    public boolean shouldApply(final ScheduleOptions opts) {
      return opts.contains(WorkDaysOption.class);
    }

    @Override
    public Fitness create(final ScheduleProperties props) {
      return new WorkDaysFitness(props);
    }
  };

  private final WorkDaysOption option;

  public WorkDaysFitness(final ScheduleProperties props) {
    super(props);
    option = opts.forClass(WorkDaysOption.class);
  }

  @Override
  public int score(final Chromosome chr) {
    int result = 0;

    Iterator<Integer> employeeIterator = props.employees();

    // Iterate through all employees
    while (employeeIterator.hasNext()) {
      int workdays = 0;

      Integer employee = employeeIterator.next();

      Iterator<ScheduleDay> scheduleDayIterator = props.scheduleDays();

      // Iterate through schedule days
      while (scheduleDayIterator.hasNext()) {
        if (chr.getGene(props.getShiftIndex(employee, scheduleDayIterator.next()))) {
          workdays++;
        }
      }

      // Only exact number of work days produces 0 score decrease
      result -= Math.abs(option.get() - workdays);
    }

    return result;
  }
}
