package workschedule.genetics.selection;

import workschedule.genetics.Entry;
import workschedule.genetics.scaling.Scaling;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public final class RouletteWheelSelection extends AbstractSelection {
  private final Scaling scaling;

  private List<ProbabilityEntry> entries;

  public RouletteWheelSelection(final Scaling scaling) {
    this.scaling = scaling;
  }

  @Override
  protected ProbabilityEntry selectParent() {
    double random = Math.random();

    for (int i = 0; i < entries.size() - 1; i += 1) {
      ProbabilityEntry entry = entries.get(i);

      if (random < entries.get(i).probability &&
          random >= (i > 0 ? entries.get(i - 1).probability : 0)) {
        return entry;
      }
    }

    return this.entries.get(entries.size() - 1);
  }

  @Override
  public void setEntries(final List<Entry> entries) {
    this.scaling.scale(entries);

    double sumOfValues = entries
      .stream()
      .mapToDouble(Entry::getValue)
      .sum();

    this.entries = entries.stream()
      .collect(
        () -> new ProbabilityEntryComputer(sumOfValues),
        ProbabilityEntryComputer::accept,
        ProbabilityEntryComputer::combine
      )
      .get();
  }

  private final class ProbabilityEntryComputer implements Consumer<Entry> {
    private final double sumOfValues;

    private final List<ProbabilityEntry> entries = new ArrayList<>();

    private double precedingProbabilities = 0;

    public ProbabilityEntryComputer(final double sumOfValues) {
      this.sumOfValues = sumOfValues;
    }

    @Override
    public void accept(final Entry entry) {
      double entryProbability = entry.getValue() / sumOfValues;

      precedingProbabilities += entryProbability;

      entries.add(ProbabilityEntry.of(entry, precedingProbabilities));
    }

    public List<ProbabilityEntry> get() {
      return entries;
    }

    public void combine(final ProbabilityEntryComputer other) {
      throw new UnsupportedOperationException();
    }
  }
}
