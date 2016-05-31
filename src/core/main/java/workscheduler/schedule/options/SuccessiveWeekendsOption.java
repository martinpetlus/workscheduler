package workscheduler.schedule.options;

public final class SuccessiveWeekendsOption implements Option<SuccessiveWeekendsOption> {
  private final int successiveFree;

  private final int successiveWork;

  public SuccessiveWeekendsOption(final int successiveFree, final int successiveWork) {
    this.successiveFree = successiveFree;
    this.successiveWork = successiveWork;
  }

  public int getSuccessiveFree() {
    return successiveFree;
  }

  public int getSuccessiveWork() {
    return successiveWork;
  }
}
