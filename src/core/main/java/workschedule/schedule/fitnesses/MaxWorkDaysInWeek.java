package workschedule.schedule.fitnesses;

import workschedule.Chromosome;
import workschedule.schedule.Day;
import workschedule.schedule.ScheduleProperties;
import workschedule.schedule.options.MaxWorkDaysInWeekOption;

import java.util.Iterator;

public final class MaxWorkDaysInWeek extends AbstractFitness {
    private final MaxWorkDaysInWeekOption option;

    public MaxWorkDaysInWeek(final ScheduleProperties props) {
        super(props);
        option = opts.forClass(MaxWorkDaysInWeekOption.class);
    }

    @Override
    public int fitness(final Chromosome chr) {
        int result = 0;

        Iterator<Integer> employeeIterator = props.employees();

        // Iterate through all employees
        while (employeeIterator.hasNext()) {
            int employee = employeeIterator.next();

            Iterator<Integer> weekIterator = props.weeks();

            // Iterate through weeks
            while (weekIterator.hasNext()) {
                int week = weekIterator.next();

                int workDays = 0;

                Iterator<Day> dayIterator = props.days();

                // Compute number of work days in week
                while (dayIterator.hasNext()) {
                    if (chr.getParam(props.getShiftIndex(employee, week, dayIterator.next()))) {
                        workDays++;
                    }
                }

                // Decrease fitness only if maximum of work days in week is exceeded
                result += Math.min(0, option.get() - workDays);
            }
        }

        return result;
    }
}
