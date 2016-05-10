package workschedule.schedule.fitnesses;

import workschedule.genetics.Chromosome;
import workschedule.schedule.ScheduleDay;
import workschedule.schedule.ScheduleProperties;
import workschedule.schedule.options.MaxSuccessiveWorkDaysOption;
import workschedule.schedule.options.ScheduleOptions;

import java.util.Iterator;

public final class MaxSuccessiveWorkDaysFitness extends AbstractFitness {
    final static FitnessProvider PROVIDER = new FitnessProvider() {
        @Override
        public boolean shouldApply(final ScheduleOptions opts) {
            return opts.contains(MaxSuccessiveWorkDaysOption.class);
        }

        @Override
        public Fitness create(final ScheduleProperties props) {
            return new MaxSuccessiveWorkDaysFitness(props);
        }
    };

    private final MaxSuccessiveWorkDaysOption option;

    public MaxSuccessiveWorkDaysFitness(final ScheduleProperties props) {
        super(props);
        option = opts.forClass(MaxSuccessiveWorkDaysOption.class);
    }

    @Override
    public int fitness(final Chromosome chr) {
        int result = 0;

        Iterator<Integer> employeeIterator = props.employees();

        // Iterate through all employees
        while (employeeIterator.hasNext()) {
            int successiveWorkDays = 0;

            Integer employee = employeeIterator.next();

            Iterator<ScheduleDay> scheduleDayIterator = props.scheduleDays();

            while (scheduleDayIterator.hasNext()) {
                ScheduleDay scheduleDay = scheduleDayIterator.next();

                if (chr.getParam(props.getShiftIndex(employee, scheduleDay))) {
                    successiveWorkDays++; // Day at work
                } else { // Free day
                    // If maximum successive work days is exceeded
                    result += Math.min(
                        option.get() - successiveWorkDays,
                        0
                    );

                    // Reset the counter of successive work days
                    successiveWorkDays = 0;
                }
            }

            // Check last days of schedule for successive work days
            result += Math.min(
                option.get() - successiveWorkDays,
                0
            );
        }

        return result;
    }
}
