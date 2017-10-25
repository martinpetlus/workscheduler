package workscheduler.schedule.options;

public final class WorkdaysOption implements Option<WorkdaysOption> {
  private final int workdays;

  public WorkdaysOption(final int workdays) {
    this.workdays = workdays;
  }

  public int get() {
    return workdays;
  }
}
