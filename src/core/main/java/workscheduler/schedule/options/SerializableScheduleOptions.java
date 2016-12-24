package workscheduler.schedule.options;

public final class SerializableScheduleOptions {
  private int employees;

  private int maxSuccessiveWorkDays;

  private int maxWorkDaysInWeek;

  private int minEmployeesAtWork;

  private int successiveFree;

  private int successiveWork;

  private int workDays;

  private int weeks;

  public ScheduleOptions toScheduleOptions() {
    ScheduleOptions opts = new ScheduleOptions();

    opts.add(EmployeesOption.class, new EmployeesOption(employees));
    opts.add(WeeksOption.class, new WeeksOption(weeks));
    opts.add(MaxSuccessiveWorkDaysOption.class, new MaxSuccessiveWorkDaysOption(maxSuccessiveWorkDays));
    opts.add(MaxWorkDaysInWeekOption.class, new MaxWorkDaysInWeekOption(maxWorkDaysInWeek));
    opts.add(WorkDaysOption.class, new WorkDaysOption(workDays));
    opts.add(MinEmployeesAtWorkOption.class, new MinEmployeesAtWorkOption(minEmployeesAtWork));
    opts.add(SuccessiveWeekendsOption.class, new SuccessiveWeekendsOption(successiveFree, successiveWork));

    return opts;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();

    sb.append("weeks: ");
    sb.append(weeks);
    sb.append('\n');


    sb.append("employees: ");
    sb.append(employees);
    sb.append('\n');

    sb.append("maxWorkDaysInWeek: ");
    sb.append(maxWorkDaysInWeek);
    sb.append('\n');

    sb.append("maxSuccessiveWorkDays: ");
    sb.append(maxSuccessiveWorkDays);
    sb.append('\n');

    sb.append("successiveFree: ");
    sb.append(weeks);
    sb.append('\n');

    sb.append("successiveWork: ");
    sb.append(successiveWork);
    sb.append('\n');

    sb.append("workDays: ");
    sb.append(workDays);

    return sb.toString();
  }
}
