package workscheduler.genetics.crossover;

import workscheduler.genetics.Chromosome;
import workscheduler.utils.MathUtils;
import workscheduler.utils.Pair;

public final class TwoPointCrossover extends AbstractCrossover {
  @Override
  protected void implementation(final Pair<Chromosome> parents) {
    int pos1 = MathUtils.randomInt(0, parents.one.getLength() - 1);
    int pos2 = MathUtils.randomInt(0, parents.one.getLength() - 1);

    int from = Math.min(pos1, pos2);
    int to = Math.max(pos1, pos2);

    for (int i = from; i <= to; i += 1) {
      boolean tmp = parents.one.getGene(i);
      parents.one.setGene(i, parents.two.getGene(i));
      parents.two.setGene(i, tmp);
    }
  }
}
