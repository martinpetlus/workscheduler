package workscheduler.schedule.fitnesses;

import workscheduler.genetics.Chromosome;
import workscheduler.schedule.ScheduleDay;
import workscheduler.schedule.ScheduleProperties;
import workscheduler.schedule.options.MinEmployeesAtWorkOption;
import workscheduler.schedule.options.ScheduleOptions;

import java.util.Iterator;

public final class MinEmployeesAtWorkFitness extends AbstractFitness {
  final static FitnessProvider PROVIDER = new FitnessProvider() {
    @Override
    public boolean shouldApply(final ScheduleOptions opts) {
      return opts.contains(MinEmployeesAtWorkOption.class);
    }

    @Override
    public Fitness create(final ScheduleProperties props) {
      return new MinEmployeesAtWorkFitness(props);
    }
  };

  private final MinEmployeesAtWorkOption option;

  public MinEmployeesAtWorkFitness(final ScheduleProperties props) {
    super(props);
    option = opts.forClass(MinEmployeesAtWorkOption.class);
  }

  @Override
  public int score(final Chromosome chr) {
    int result = 0;

    Iterator<ScheduleDay> scheduleDaysIterator = props.scheduleDays();

    while (scheduleDaysIterator.hasNext()) {
      int employeesAtWork = 0;

      ScheduleDay day = scheduleDaysIterator.next();

      Iterator<Integer> employeesIterator = props.employees();

      while (employeesIterator.hasNext()) {
        if (chr.getGene(props.getShiftIndex(employeesIterator.next(), day))) {
          employeesAtWork += 1;
        }
      }

      result += Math.min(0, employeesAtWork - option.get());
    }

    return result;
  }
}
