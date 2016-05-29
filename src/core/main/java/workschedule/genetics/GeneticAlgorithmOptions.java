package workschedule.genetics;

public final class GeneticAlgorithmOptions {
  private final int populationSize;

  private final int eliteCount;

  public static class Builder {
    private int populationSize = 100;

    private int eliteCount = 4;

    public GeneticAlgorithmOptions build() {
      return new GeneticAlgorithmOptions(this);
    }

    public void setPopulationSize(final int populationSize) {
      this.populationSize = populationSize;
    }

    public void setEliteCount(final int eliteCount) {
      this.eliteCount = eliteCount;
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
