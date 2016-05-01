package workschedule.schedule.fitnesses;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public enum FitnessRegistry implements Iterable<FitnessProvider> {
    INSTANCE;

    private static Set<FitnessProvider> registry = new HashSet<>();

    private static void register(final FitnessProvider provider) {
        registry.add(provider);
    }

    static {
        register(WorkDays.PROVIDER);
        register(SuccessiveWeekends.PROVIDER);
        register(MinEmployeesAtWork.PROVIDER);
        register(MaxSuccessiveWorkDays.PROVIDER);
        register(MaxWorkDaysInWeek.PROVIDER);
    }

    @Override
    public Iterator<FitnessProvider> iterator() {
        return registry.iterator();
    }
}
