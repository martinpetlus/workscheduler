package workschedule.schedule.options;

import java.util.HashMap;
import java.util.Map;

public final class ScheduleOptions {
    private final Map<Class<? extends Option>, Option> implementationToOption = new HashMap<>();

    public <O extends Option> O forClass(final Class<O> implementation) {
        return implementation.cast(implementationToOption.get(implementation));
    }

    public <O extends Option> void add(final Class<O> implementation, final O option) {
        implementationToOption.put(implementation, option);
    }

    public boolean contains(final Class<? extends Option> implementation) {
        return implementationToOption.containsKey(implementation);
    }
}
