package workschedule.schedule;

import com.google.gson.Gson;

public final class ScheduleOptions {

    private ScheduleOptions() {}

    private int weeks;

    private int employees;

    public int getWeeks() {
        return weeks;
    }

    public int getEmployees() {
        return employees;
    }

    public static ScheduleOptions of(final String json) {
        return new Gson().fromJson(json, ScheduleOptions.class);
    }
}
