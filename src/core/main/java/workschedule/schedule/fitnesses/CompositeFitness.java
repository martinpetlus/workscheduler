package workschedule.schedule.fitnesses;

import workschedule.genetics.Chromosome;

import java.util.ArrayList;
import java.util.List;

public final class CompositeFitness implements Fitness {
  private final List<Fitness> delegates;

  public CompositeFitness(final List<Fitness> delegates) {
    this.delegates = new ArrayList<>(delegates);
  }

  @Override
  public int score(final Chromosome chr) {
    int result = 0;

    for (Fitness fitness: delegates) {
      result += fitness.score(chr);
    }

    return result;
  }
}
