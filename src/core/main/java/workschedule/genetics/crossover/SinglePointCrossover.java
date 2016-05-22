package workschedule.genetics.crossover;

import workschedule.genetics.Chromosome;
import workschedule.utils.MathUtils;

public final class SinglePointCrossover extends AbstractCrossover {
    @Override
    void implementation(final Chromosome[] parents) {
        Chromosome parent1 = parents[0];
        Chromosome parent2 = parents[1];

        // Last point of crossover is last but one
        int pos = MathUtils.randomInt(0, parent1.getLength() - 2);

        // Exchange params of chromosomes from 0 to `pos`
        for (int i = 0; i <= pos; i += 1) {
            boolean tmp = parent1.getParam(i);
            parent1.setParam(i, parent2.getParam(i));
            parent2.setParam(i, tmp);
        }
    }
}
