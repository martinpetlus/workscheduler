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
            return enums[MONDAY.ordinal()];
        }
    };

    private static final Day[] enums = values();

    public Day following() {
        return enums[ordinal() + 1];
    }
}
