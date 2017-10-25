package workscheduler.schedule.fitnesses;

import workscheduler.genetics.Chromosome;
import workscheduler.schedule.ScheduleDay;
import workscheduler.schedule.ScheduleProperties;
import workscheduler.schedule.options.MaxSuccessiveWorkdaysOption;
import workscheduler.schedule.options.ScheduleOptions;

import java.util.Iterator;

public final class MaxSuccessiveWorkdaysFitness extends AbstractFitness {
  final static FitnessProvider PROVIDER = new FitnessProvider() {
    @Override
    public boolean shouldApply(final ScheduleOptions opts) {
      return opts.contains(MaxSuccessiveWorkdaysOption.class);
    }

    @Override
    public Fitness create(final ScheduleProperties props) {
      return new MaxSuccessiveWorkdaysFitness(props);
    }
  };

  private final MaxSuccessiveWorkdaysOption option;

  public MaxSuccessiveWorkdaysFitness(final ScheduleProperties props) {
    super(props);
    option = opts.forClass(MaxSuccessiveWorkdaysOption.class);
  }

  @Override
  public int score(final Chromosome chr) {
    int result = 0;

    Iterator<Integer> employeeIterator = props.employees();

    // Iterate through all employees
    while (employeeIterator.hasNext()) {
      int successiveWorkdays = 0;

      Integer employee = employeeIterator.next();

      Iterator<ScheduleDay> scheduleDayIterator = props.scheduleDays();

      while (scheduleDayIterator.hasNext()) {
        ScheduleDay scheduleDay = scheduleDayIterator.next();

        if (chr.getGene(props.getShiftIndex(employee, scheduleDay))) {
          successiveWorkdays++; // Day at work
        } else { // Free day
          // If maximum successive work days is exceeded
          result += Math.min(option.get() - successiveWorkdays, 0);

          // Reset the counter of successive work days
          successiveWorkdays = 0;
        }
      }

      // Check last days of schedule for successive work days
      result += Math.min(option.get() - successiveWorkdays, 0);
    }

    return result;
  }
}
