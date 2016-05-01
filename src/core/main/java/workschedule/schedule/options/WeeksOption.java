package workschedule.schedule.options;

public final class WeeksOption implements Option<WeeksOption> {
    private final int weeks;

    public WeeksOption(final int weeks) {
        this.weeks = weeks;
    }

    public int get() {
        return weeks;
    }
}
