package workscheduler.schedule.fitnesses;

import workscheduler.genetics.Chromosome;
import workscheduler.schedule.Day;
import workscheduler.schedule.ScheduleProperties;
import workscheduler.schedule.options.MaxWorkdaysPerWeekOption;
import workscheduler.schedule.options.ScheduleOptions;

import java.util.Iterator;

public final class MaxWorkdaysPerWeekFitness extends AbstractFitness {
  final static FitnessProvider PROVIDER = new FitnessProvider() {
    @Override
    public boolean shouldApply(final ScheduleOptions opts) {
      return opts.contains(MaxWorkdaysPerWeekOption.class);
    }

    @Override
    public Fitness create(final ScheduleProperties props) {
      return new MaxWorkdaysPerWeekFitness(props);
    }
  };

  private final MaxWorkdaysPerWeekOption option;

  public MaxWorkdaysPerWeekFitness(final ScheduleProperties props) {
    super(props);
    option = opts.forClass(MaxWorkdaysPerWeekOption.class);
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
