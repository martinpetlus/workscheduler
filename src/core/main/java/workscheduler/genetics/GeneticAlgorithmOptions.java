package workscheduler.genetics;

public final class GeneticAlgorithmOptions {
  private final int populationSize;

  private final int eliteCount;

  public static class Builder {
    private int populationSize = 100;

    private int eliteCount = 4;

    public GeneticAlgorithmOptions build() {
      return new GeneticAlgorithmOptions(this);
    }

    public Builder setPopulationSize(final int populationSize) {
      this.populationSize = populationSize;
      return this;
    }

    public Builder setEliteCount(final int eliteCount) {
      this.eliteCount = eliteCount;
      return this;
    }
  }

  private GeneticAlgorithmOptions(final Builder builder) {
    this.populationSize = builder.populationSize;
    this.eliteCount = builder.eliteCount;
  }

  public static Builder builder() {
    return new Builder();
  }

  public int getPopulationSize() {
    return populationSize;
  }

  public int getEliteCount() {
    return eliteCount;
  }
}
