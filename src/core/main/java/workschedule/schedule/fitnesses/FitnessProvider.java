package workschedule.schedule.fitnesses;

import workschedule.schedule.ScheduleProperties;
import workschedule.schedule.options.ScheduleOptions;

public interface FitnessProvider {
    public boolean shouldApply(ScheduleOptions opts);

    public Fitness create(ScheduleProperties props);
}
