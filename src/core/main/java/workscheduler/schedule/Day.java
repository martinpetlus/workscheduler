package workscheduler.schedule;

public enum Day {
  MONDAY(1),
  TUESDAY(2),
  WEDNESDAY(3),
  THURSDAY(4),
  FRIDAY(5),
  SATURDAY(6),
  SUNDAY(7) {
    @Override
    public Day following() {
      return enums[MONDAY.ordinal()];
    }
  };

  private static final Day[] enums = values();

  private final int numeric;

  Day(final int numeric) {
    this.numeric = numeric;
  }

  public Day following() {
    return enums[ordinal() + 1];
  }

  public final int numeric() {
    return numeric;
  }
}
