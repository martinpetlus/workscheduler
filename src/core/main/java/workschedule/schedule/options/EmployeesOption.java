package workschedule.schedule.options;

public final class EmployeesOption implements Option<EmployeesOption> {
    private final int employees;

    public EmployeesOption(final int employees) {
        this.employees = employees;
    }

    public int get() {
        return employees;
    }
}
