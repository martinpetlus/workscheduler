package workscheduler.genetics;

import java.util.Comparator;

public interface ChromosomeFactory {
  public Chromosome createRandom();

  public Comparator<Entry> descending();

  public String toJson(Chromosome chromosome);
}
