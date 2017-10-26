package workscheduler.schedule.options;

public final class SerializableScheduleOptions {
  private String name;

  private int employees;

  private int maxSuccessiveWorkdays;

  private int maxWorkdaysPerWeek;

  private int minEmployeesAtWork;

  private int successiveFree;

  private int successiveWork;

  private int workdays;

  private int weeks;

  public ScheduleOptions toScheduleOptions() {
    ScheduleOptions opts = new ScheduleOptions();

    opts.add(EmployeesOption.class, new EmployeesOption(employees));
    opts.add(WeeksOption.class, new WeeksOption(weeks));
    opts.add(MaxSuccessiveWorkdaysOption.class, new MaxSuccessiveWorkdaysOption(maxSuccessiveWorkdays));
    opts.add(MaxWorkdaysPerWeekOption.class, new MaxWorkdaysPerWeekOption(maxWorkdaysPerWeek));
    opts.add(WorkdaysOption.class, new WorkdaysOption(workdays));
    opts.add(MinEmployeesAtWorkOption.class, new MinEmployeesAtWorkOption(minEmployeesAtWork));
    opts.add(SuccessiveWeekendsOption.class, new SuccessiveWeekendsOption(successiveFree, successiveWork));

    return opts;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();

    sb.append("name: ");
    sb.append(this.name);
    sb.append('\n');

    sb.append("weeks: ");
    sb.append(this.weeks);
    sb.append('\n');

    sb.append("employees: ");
    sb.append(this.employees);
    sb.append('\n');

    sb.append("maxWorkdaysPerWeek: ");
    sb.append(this.maxWorkdaysPerWeek);
    sb.append('\n');

    sb.append("maxSuccessiveWorkdays: ");
    sb.append(this.maxSuccessiveWorkdays);
    sb.append('\n');

    sb.append("successiveFree: ");
    sb.append(this.weeks);
    sb.append('\n');

    sb.append("successiveWork: ");
    sb.append(this.successiveWork);
    sb.append('\n');

    sb.append("workdays: ");
    sb.append(this.workdays);

    return sb.toString();
  }
}
