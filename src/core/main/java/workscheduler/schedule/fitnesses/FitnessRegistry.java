package workscheduler.schedule.fitnesses;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public enum FitnessRegistry implements Iterable<FitnessProvider> {
  INSTANCE;

  private static Set<FitnessProvider> registry = new HashSet<>();

  private static void register(final FitnessProvider provider) {
    registry.add(provider);
  }

  static {
    register(WorkDaysFitness.PROVIDER);
    register(SuccessiveWeekendsFitness.PROVIDER);
    register(MinEmployeesAtWorkFitness.PROVIDER);
    register(MaxSuccessiveWorkDaysFitness.PROVIDER);
    register(MaxWorkDaysInWeekFitness.PROVIDER);
  }

  @Override
  public Iterator<FitnessProvider> iterator() {
    return registry.iterator();
  }
}
