package workschedule.genetics.crossover;

import workschedule.genetics.Chromosome;

abstract class AbstractCrossover implements Crossover {
    @Override
    public void crossover(final Chromosome[] parents) {
        if (Math.random() <= Crossover.PROBABILITY) {
            this.implementation(parents);
        }
    }

    abstract void implementation(final Chromosome[] parents);
}
