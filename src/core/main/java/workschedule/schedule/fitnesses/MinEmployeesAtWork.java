package workschedule.schedule.fitnesses;

import workschedule.Chromosome;
import workschedule.schedule.ScheduleDay;
import workschedule.schedule.ScheduleProperties;

import java.util.Iterator;

public final class MinEmployeesAtWork extends AbstractFitness {
    public MinEmployeesAtWork(final ScheduleProperties props) {
        super(props);
    }

    @Override
    public int fitness(final Chromosome chr) {
        int result = 0;

        Iterator<ScheduleDay> scheduleDaysIterator = props.scheduleDays();

        while (scheduleDaysIterator.hasNext()) {
            int employeesAtWork = 0;

            ScheduleDay day = scheduleDaysIterator.next();

            Iterator<Integer> employeesIterator = props.employees();

            while (employeesIterator.hasNext()) {
                if (chr.getParam(props.getShiftIndex(employeesIterator.next(), day))) {
                    employeesAtWork += 1;
                }
            }

            result += Math.min(0, employeesAtWork - opts.getMinEmployeesAtWork());
        }

        return result;
    }
}
