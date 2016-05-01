package workschedule.schedule.options;

public final class WorkDaysOption implements Option<WorkDaysOption> {
    private final int workDays;

    public WorkDaysOption(final int workDays) {
        this.workDays = workDays;
    }

    public int get() {
        return workDays;
    }
}
