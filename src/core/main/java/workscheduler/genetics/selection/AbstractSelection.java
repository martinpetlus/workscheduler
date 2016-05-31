package workscheduler.genetics.selection;

import workscheduler.genetics.Chromosome;
import workscheduler.genetics.Entry;
import workscheduler.utils.Pair;

abstract class AbstractSelection implements Selection {
  @Override
  public Pair<Chromosome> selectParents() {
    Entry parent1 = this.selectParent().entry;
    Entry parent2;

    while ((parent2 = this.selectParent().entry) == parent1)
      ;

    return Pair.of(parent1.getChromosome(), parent2.getChromosome());
  }

  protected abstract ProbabilityEntry selectParent();
}
