package workschedule.schedule.fitnesses;

import workschedule.Chromosome;
import workschedule.schedule.Day;
import workschedule.schedule.ScheduleProperties;
import workschedule.schedule.options.ScheduleOptions;
import workschedule.schedule.options.SuccessiveWeekendsOption;

import java.util.Iterator;

public final class SuccessiveWeekends extends AbstractFitness {
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
            return new SuccessiveWeekends(props);
        }
    };

    private final SuccessiveWeekendsOption option;

    public SuccessiveWeekends(final ScheduleProperties props) {
        super(props);
        option = opts.forClass(SuccessiveWeekendsOption.class);
    }

    @Override
    public int fitness(final Chromosome chr) {
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

                boolean workSaturday = chr.getParam(props.getShiftIndex(employee, week, Day.SATURDAY));
                boolean workSunday = chr.getParam(props.getShiftIndex(employee, week, Day.SUNDAY));

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
