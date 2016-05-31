package workscheduler.genetics;

public final class Entry {
  private final Chromosome chromosome;

  private double value;

  private Entry(final Chromosome chromosome, final double value) {
    this.chromosome = chromosome;
    this.value = value;
  }

  public static Entry of(final Chromosome chromosome, final double value) {
    return new Entry(chromosome, value);
  }

  public Chromosome getChromosome() {
    return chromosome;
  }

  public double getValue() {
    return value;
  }

  public void setValue(final double value) {
      this.value = value;
  }
}
