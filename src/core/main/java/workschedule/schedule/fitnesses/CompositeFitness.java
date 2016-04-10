package workschedule.schedule.fitnesses;

import workschedule.Chromosome;

import java.util.ArrayList;
import java.util.List;

public final class CompositeFitness implements Fitness {
    private final List<Fitness> children;

    public CompositeFitness(final List<Fitness> children) {
        this.children = new ArrayList<Fitness>(children);
    }

    @Override
    public int fitness(final Chromosome chr) {
        int result = 0;

        for (Fitness fitness: children) {
            result += fitness.fitness(chr);
        }

        return result;
    }
}
