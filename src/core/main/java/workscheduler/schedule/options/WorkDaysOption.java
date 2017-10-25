package workscheduler.schedule.options;

public final class WorkDaysOption implements Option<WorkDaysOption> {
  private final int workdays;

  public WorkDaysOption(final int workdays) {
    this.workdays = workdays;
  }

  public int get() {
    return workdays;
  }
}
