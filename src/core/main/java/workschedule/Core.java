package workschedule;

import workschedule.schedule.ScheduleOptions;

public class Core {

    public static void main(final String[] args) {
        // Parse options passed as JSON
        final ScheduleOptions opts = ScheduleOptions.of(args[0]);
    }
}
