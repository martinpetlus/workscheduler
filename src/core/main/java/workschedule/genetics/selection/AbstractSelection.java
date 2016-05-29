package workschedule.genetics.selection;

import workschedule.genetics.Chromosome;
import workschedule.genetics.Entry;
import workschedule.utils.Pair;

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
