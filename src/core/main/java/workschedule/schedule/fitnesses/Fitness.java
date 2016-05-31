package workschedule.schedule.fitnesses;

import workschedule.genetics.Chromosome;

public interface Fitness {
  public int score(Chromosome chr);
}
