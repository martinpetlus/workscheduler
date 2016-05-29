package workschedule.genetics.selection;

import workschedule.genetics.Chromosome;
import workschedule.genetics.Entry;
import workschedule.utils.Pair;

import java.util.List;

public interface Selection {
  public Pair<Chromosome> selectParents();

  public void setEntries(List<Entry> entries);
}
