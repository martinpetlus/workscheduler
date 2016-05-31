package workscheduler.schedule.fitnesses;

import workscheduler.genetics.Chromosome;

public interface Fitness {
  public int score(Chromosome chr);
}
