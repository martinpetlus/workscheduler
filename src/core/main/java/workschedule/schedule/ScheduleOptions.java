package workschedule.schedule;

import com.google.gson.Gson;

public final class ScheduleOptions {

    private ScheduleOptions() {}

    private int weeks;

    public int getWeeks() {
        return weeks;
    }

    public static ScheduleOptions of(final String json) {
        return new Gson().fromJson(json, ScheduleOptions.class);
    }
}
