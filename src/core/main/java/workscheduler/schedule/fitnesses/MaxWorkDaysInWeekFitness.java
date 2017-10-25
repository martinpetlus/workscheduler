package workscheduler.schedule.fitnesses;

import workscheduler.genetics.Chromosome;
import workscheduler.schedule.Day;
import workscheduler.schedule.ScheduleProperties;
import workscheduler.schedule.options.MaxWorkdaysInWeekOption;
import workscheduler.schedule.options.ScheduleOptions;

import java.util.Iterator;

public final class MaxWorkdaysInWeekFitness extends AbstractFitness {
  final static FitnessProvider PROVIDER = new FitnessProvider() {
    @Override
    public boolean shouldApply(final ScheduleOptions opts) {
      return opts.contains(MaxWorkdaysInWeekOption.class);
    }

    @Override
    public Fitness create(final ScheduleProperties props) {
      return new MaxWorkdaysInWeekFitness(props);
    }
  };

  private final MaxWorkdaysInWeekOption option;

  public MaxWorkdaysInWeekFitness(final ScheduleProperties props) {
    super(props);
    option = opts.forClass(MaxWorkdaysInWeekOption.class);
  }

  @Override
  public int score(final Chromosome chr) {
    int result = 0;

    Iterator<Integer> employeeIterator = props.employees();

    // Iterate through all employees
    while (employeeIterator.hasNext()) {
      int employee = employeeIterator.next();

      Iterator<Integer> weekIterator = props.weeks();

      // Iterate through weeks
      while (weekIterator.hasNext()) {
        int week = weekIterator.next();

        int workdays = 0;

        Iterator<Day> dayIterator = props.days();

        // Compute number of work days in week
        while (dayIterator.hasNext()) {
          if (chr.getGene(props.getShiftIndex(employee, week, dayIterator.next()))) {
            workdays++;
          }
        }

        // Decrease score only if maximum of work days in week is exceeded
        result += Math.min(0, option.get() - workdays);
      }
    }

    return result;
  }
}
