package workscheduler.schedule.options;

public final class MinEmployeesAtWorkOption implements Option<MinEmployeesAtWorkOption> {
  private final int minEmployeesAtWork;

  public MinEmployeesAtWorkOption(final int minEmployeesAtWork) {
    this.minEmployeesAtWork = minEmployeesAtWork;
  }

  public int get() {
    return minEmployeesAtWork;
  }
}
