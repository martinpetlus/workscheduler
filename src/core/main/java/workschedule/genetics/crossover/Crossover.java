package workschedule.genetics.crossover;

import workschedule.genetics.Chromosome;

public interface Crossover {
    public static final double PROBABILITY = 0.65;

    public void crossover(Chromosome[] parents);
}
