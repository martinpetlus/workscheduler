package workscheduler.schedule;

import java.util.List;
import java.util.ArrayList;
import java.util.Iterator;

import workscheduler.genetics.Chromosome;

public final class WorkSchedule {
  public static final class WorkDay {
    private final Day day;
    private final int employee;

    public WorkDay(final Day day, final int employee) {
      this.day = day;
      this.employee = employee;
    }
  }

  public static final class WorkWeek {
    private final List<WorkDay> workdays = new ArrayList<>();
  }

  private final List<WorkWeek> workWeeks = new ArrayList<>();

  private WorkSchedule() {}

  public static WorkSchedule of(final ScheduleProperties props, final Chromosome chromosome) {
    WorkSchedule workSchedule = new WorkSchedule();

    Iterator<Integer> weeksIterator = props.weeks();

    while (weeksIterator.hasNext()) {
      int week = weeksIterator.next();

      WorkWeek workWeek = new WorkWeek();

      Iterator<Day> daysIterator = props.days();

      while (daysIterator.hasNext()) {
        Day day = daysIterator.next();

        Iterator<Integer> employeesIterator = props.employees();

        while (employeesIterator.hasNext()) {
          int employee = employeesIterator.next();

          if (chromosome.getGene(props.getShiftIndex(employee, week, day))) {
            workWeek.workdays.add(new WorkDay(day, employee));
            break;
          }
        }
      }

      workSchedule.workWeeks.add(workWeek);
    }

    return workSchedule;
  }
}
