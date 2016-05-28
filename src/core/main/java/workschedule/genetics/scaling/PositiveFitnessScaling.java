package workschedule.genetics.scaling;

import workschedule.genetics.Entry;

import java.util.List;

public final class PositiveFitnessScaling implements Scaling {
    @Override
    public void scale(final List<Entry> entries) {
        entries.forEach((entry) ->
            entry.setValue(1 / -entry.getValue())
        );

        double sum = entries
            .stream()
            .mapToDouble(Entry::getValue)
            .sum();

        entries.forEach((entry) ->
            entry.setValue(entry.getValue() / sum)
        );
    }
}
