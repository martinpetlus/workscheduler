package workscheduler.schedule.fitnesses;

import workscheduler.genetics.Chromosome;
import workscheduler.schedule.Day;
import workscheduler.schedule.ScheduleProperties;
import workscheduler.schedule.options.ScheduleOptions;
import workscheduler.schedule.options.SuccessiveWeekendsOption;

import java.util.Iterator;

public final class SuccessiveWeekendsFitness extends AbstractFitness {
  private static int cost(final boolean shouldDayBeFree, final boolean isWorkDay) {
    if (shouldDayBeFree) {
      return isWorkDay ? 1 : 0;
    } else {
      return isWorkDay ? 0 : 1;
    }
  }

  final static FitnessProvider PROVIDER = new FitnessProvider() {
    @Override
    public boolean shouldApply(final ScheduleOptions opts) {
      return opts.contains(SuccessiveWeekendsOption.class);
    }

    @Override
    public Fitness create(final ScheduleProperties props) {
      return new SuccessiveWeekendsFitness(props);
    }
  };

  private final SuccessiveWeekendsOption option;

  public SuccessiveWeekendsFitness(final ScheduleProperties props) {
    super(props);
    option = opts.forClass(SuccessiveWeekendsOption.class);
  }

  @Override
  public int score(final Chromosome chr) {
    int result = 0;

    Iterator<Integer> employeeIterator = props.employees();

    // Iterate through all employees
    while (employeeIterator.hasNext()) {
      int diffs = 0;
      int weeks = 1;

      // Prevent compiler error with this useless initialization
      // FIXME: Refactor algorithm to avoid this initialization
      boolean freeWeekend = false;

      Integer employee = employeeIterator.next();

      Iterator<Integer> weekIterator = props.weeks();

      // Iterate through all weeks of schedule
      while (weekIterator.hasNext()) {
        Integer week = weekIterator.next();

        boolean workSaturday = chr.getGene(props.getShiftIndex(employee, week, Day.SATURDAY));
        boolean workSunday = chr.getGene(props.getShiftIndex(employee, week, Day.SUNDAY));

        if (week > 1) {
          // Switch state if successive weekends was reached
          if (weeks > (freeWeekend ?
              option.getSuccessiveFree() :
              option.getSuccessiveWork())) {
            weeks = 1;
            freeWeekend = !freeWeekend;
          }
        } else {
          // Initialize weekend state from first weekend in schedule
          freeWeekend = !workSaturday && !workSunday;
        }

        diffs += cost(freeWeekend, workSaturday) + cost(freeWeekend, workSunday);

        weeks += 1;
      }

      result -= diffs;
    }

    return result;
  }
}
