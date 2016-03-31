package workschedule.schedule;

public final class ScheduleDay {

    private final Day day;

    private final Integer week;

    public ScheduleDay(final Day day, final Integer week) {
        this.day = day;
        this.week = week;
    }

    public Day getDay() {
        return day;
    }

    public Integer getWeek() {
        return week;
    }
}
