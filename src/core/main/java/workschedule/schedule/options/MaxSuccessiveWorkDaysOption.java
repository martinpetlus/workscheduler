package workschedule.schedule.options;

public final class MaxSuccessiveWorkDaysOption implements Option<MaxSuccessiveWorkDaysOption> {
  private final int maxSuccessiveWorkDays;

  public MaxSuccessiveWorkDaysOption(final int maxSuccessiveWorkDays) {
    this.maxSuccessiveWorkDays = maxSuccessiveWorkDays;
  }

  public int get() {
    return maxSuccessiveWorkDays;
  }
}
