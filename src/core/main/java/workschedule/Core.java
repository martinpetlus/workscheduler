package workschedule;

import workschedule.genetics.ChromosomeFactory;
import workschedule.schedule.WorkScheduleFactory;
import workschedule.schedule.options.*;

public final class Core {
  public static void main(final String[] args) {
    ScheduleOptions opts = new ScheduleOptions();

    opts.add(EmployeesOption.class, new EmployeesOption(2));
    opts.add(WeeksOption.class, new WeeksOption(4));
    opts.add(WorkDaysOption.class, new WorkDaysOption(16));
    opts.add(MinEmployeesAtWorkOption.class, new MinEmployeesAtWorkOption(1));

    ChromosomeFactory factory = new WorkScheduleFactory(opts);

    System.out.println(factory.createRandom().fitness());
  }
}
