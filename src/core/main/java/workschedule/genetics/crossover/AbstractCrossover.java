package workschedule.genetics.crossover;

import workschedule.genetics.Chromosome;
import workschedule.utils.Pair;

abstract class AbstractCrossover implements Crossover {
    @Override
    public void crossover(final Pair<Chromosome> parents) {
        if (Math.random() <= Crossover.PROBABILITY) {
            this.implementation(parents);
        }
    }

    abstract void implementation(final Pair<Chromosome> parents);
}
