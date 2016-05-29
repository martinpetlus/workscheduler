package workschedule.genetics;

import java.util.Comparator;

public interface ChromosomeFactory {
  public Chromosome createRandom();

  public Comparator<Entry> descending();
}
