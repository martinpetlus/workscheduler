package workscheduler.schedule.options;

public final class MaxSuccessiveWorkdaysOption implements Option<MaxSuccessiveWorkdaysOption> {
  private final int maxSuccessiveWorkdays;

  public MaxSuccessiveWorkdaysOption(final int maxSuccessiveWorkdays) {
    this.maxSuccessiveWorkdays = maxSuccessiveWorkdays;
  }

  public int get() {
    return maxSuccessiveWorkdays;
  }
}
