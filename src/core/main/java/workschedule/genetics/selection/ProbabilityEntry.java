package workschedule.genetics.selection;

import workschedule.genetics.Entry;

public final class ProbabilityEntry {
  public final Entry entry;

  public final double probability;

  private ProbabilityEntry(final Entry entry, final double probability) {
    this.entry = entry;
    this.probability = probability;
  }

  public static ProbabilityEntry of(final Entry entry, final double probability) {
    return new ProbabilityEntry(entry, probability);
  }
}
