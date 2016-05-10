package workschedule.schedule.fitnesses;

import workschedule.genetics.Chromosome;
import workschedule.schedule.ScheduleDay;
import workschedule.schedule.ScheduleProperties;
import workschedule.schedule.options.ScheduleOptions;
import workschedule.schedule.options.WorkDaysOption;

import java.util.Iterator;

public final class WorkDaysFitness extends AbstractFitness {
    final static FitnessProvider PROVIDER = new FitnessProvider() {
        @Override
        public boolean shouldApply(final ScheduleOptions opts) {
            return opts.contains(WorkDaysOption.class);
        }

        @Override
        public Fitness create(final ScheduleProperties props) {
            return new WorkDaysFitness(props);
        }
    };

    private final WorkDaysOption option;

    public WorkDaysFitness(final ScheduleProperties props) {
        super(props);
        option = opts.forClass(WorkDaysOption.class);
    }

    @Override
    public int fitness(final Chromosome chr) {
        int result = 0;

        Iterator<Integer> employeeIterator = props.employees();

        // Iterate through all employees
        while (employeeIterator.hasNext()) {
            int workDays = 0;

            Integer employee = employeeIterator.next();

            Iterator<ScheduleDay> scheduleDayIterator = props.scheduleDays();

            // Iterate through schedule days
            while (scheduleDayIterator.hasNext()) {
                if (chr.getParam(props.getShiftIndex(employee, scheduleDayIterator.next()))) {
                    workDays++;
                }
            }

            // Only exact number of work days produces 0 fitness decrease
            result -= Math.abs(option.get() - workDays);
        }

        return result;
    }
}
