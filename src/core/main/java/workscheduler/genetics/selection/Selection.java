package workscheduler.genetics.selection;

import workscheduler.genetics.Chromosome;
import workscheduler.genetics.Entry;
import workscheduler.utils.Pair;

import java.util.List;

public interface Selection {
  public Pair<Chromosome> selectParents();

  public void setEntries(List<Entry> entries);
}
