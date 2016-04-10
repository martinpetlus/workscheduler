package workschedule.schedule;

import com.google.gson.Gson;

public final class ScheduleOptions {
    private ScheduleOptions() {}

    private int weeks;

    private int employees;

    private int minEmployeesAtWork;

    private int maxWorkDaysInWeek;

    public int getWeeks() {
        return weeks;
    }

    public int getEmployees() {
        return employees;
    }

    public int getMinEmployeesAtWork() {
        return minEmployeesAtWork;
    }

    public int getMaxWorkDaysInWeek() {
        return maxWorkDaysInWeek;
    }

    public static ScheduleOptions of(final String json) {
        return new Gson().fromJson(json, ScheduleOptions.class);
    }
}
