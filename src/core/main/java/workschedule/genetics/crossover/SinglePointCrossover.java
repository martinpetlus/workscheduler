package workschedule.genetics.crossover;

import workschedule.genetics.Chromosome;
import workschedule.utils.MathUtils;
import workschedule.utils.Pair;

public final class SinglePointCrossover extends AbstractCrossover {
  @Override
  void implementation(final Pair<Chromosome> parents) {
    // Last point of crossover is last but one
    int pos = MathUtils.randomInt(0, parents.one.getLength() - 2);

    // Exchange params of chromosomes from 0 to `pos`
    for (int i = 0; i <= pos; i += 1) {
      boolean tmp = parents.one.getParam(i);
      parents.one.setParam(i, parents.two.getParam(i));
      parents.two.setParam(i, tmp);
    }
  }
}
