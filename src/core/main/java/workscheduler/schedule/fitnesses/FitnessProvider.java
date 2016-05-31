package workscheduler.schedule.fitnesses;

import workscheduler.schedule.ScheduleProperties;
import workscheduler.schedule.options.ScheduleOptions;

public interface FitnessProvider {
  public boolean shouldApply(ScheduleOptions opts);

  public Fitness create(ScheduleProperties props);
}
