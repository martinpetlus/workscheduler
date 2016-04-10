package workschedule.schedule.fitnesses;

import workschedule.Chromosome;
import workschedule.schedule.ScheduleDay;
import workschedule.schedule.ScheduleProperties;

import java.util.Iterator;

public final class WorkDays extends AbstractFitness {
    public WorkDays(final ScheduleProperties props) {
        super(props);
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
            result -= Math.abs(opts.getWorkDays() - workDays);
        }

        return result;
    }
}
