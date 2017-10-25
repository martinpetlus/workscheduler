package workscheduler.schedule.options;

public final class MaxWorkdaysInWeekOption implements Option<MaxWorkdaysInWeekOption> {
  private final int maxWorkdaysInWeek;

  public MaxWorkdaysInWeekOption(final int maxWorkdaysInWeek) {
    this.maxWorkdaysInWeek = maxWorkdaysInWeek;
  }

  public int get() {
    return maxWorkdaysInWeek;
  }
}
