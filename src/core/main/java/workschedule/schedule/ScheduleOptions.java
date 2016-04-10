package workschedule.schedule;

import com.google.gson.Gson;

public final class ScheduleOptions {
    private ScheduleOptions() {}

    private int weeks;

    private int employees;

    private int minEmployeesAtWork;

    private int maxWorkDaysInWeek;

    private int workDays;

    private int maxSuccessiveWorkDays;

    private WeekendsOptions weekendsOptions;

    public WeekendsOptions getWeekendsOptions() {
        return weekendsOptions;
    }

    public int getMaxSuccessiveWorkDays() {
        return maxSuccessiveWorkDays;
    }

    public int getWorkDays() {
        return workDays;
    }

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

    public static final class WeekendsOptions {
        private WeekendsOptions() {}

        private int successiveFree;

        private int successiveWork;

        public int getSuccessiveFree() {
            return successiveFree;
        }

        public int getSuccessiveWork() {
            return successiveWork;
        }
    }
}
