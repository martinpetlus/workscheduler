package workscheduler.schedule.options;

public final class MaxWorkdaysPerWeekOption implements Option<MaxWorkdaysPerWeekOption> {
  private final int maxWorkdaysPerWeek;

  public MaxWorkdaysPerWeekOption(final int maxWorkdaysPerWeek) {
    this.maxWorkdaysPerWeek = maxWorkdaysPerWeek;
  }

  public int get() {
    return maxWorkdaysPerWeek;
  }
}
