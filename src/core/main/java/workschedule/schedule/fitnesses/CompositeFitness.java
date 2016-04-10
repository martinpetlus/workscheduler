package workschedule.schedule.fitnesses;

import workschedule.Chromosome;

import java.util.ArrayList;
import java.util.List;

public final class CompositeFitness implements Fitness {
    private final List<Fitness> delegates;

    public CompositeFitness(final List<Fitness> delegates) {
        this.delegates = new ArrayList<Fitness>(delegates);
    }

    @Override
    public int fitness(final Chromosome chr) {
        int result = 0;

        for (Fitness fitness: delegates) {
            result += fitness.fitness(chr);
        }

        return result;
    }
}
