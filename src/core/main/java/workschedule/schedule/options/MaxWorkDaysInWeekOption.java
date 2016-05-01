package workschedule.schedule.options;

public final class MaxWorkDaysInWeekOption implements Option<MaxWorkDaysInWeekOption> {
    private final int maxWorkDaysInWeek;

    public MaxWorkDaysInWeekOption(final int maxWorkDaysInWeek) {
        this.maxWorkDaysInWeek = maxWorkDaysInWeek;
    }

    public int get() {
        return maxWorkDaysInWeek;
    }
}
