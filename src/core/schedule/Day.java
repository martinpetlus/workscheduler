package core.schedule;

public enum Day {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY {

        @Override
        public Day following() {
            return values[MONDAY.ordinal()];
        }
    };

    private static final Day[] values = values();

    public Day following() {
        return values[ordinal() + 1];
    }
}
