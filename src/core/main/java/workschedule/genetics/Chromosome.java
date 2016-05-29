package workschedule.genetics;

import workschedule.schedule.fitnesses.Fitness;

public final class Chromosome {
  private final boolean[] params;

  private final Fitness fitness;

  public Chromosome(final int length, final Fitness fitness) {
    this.params = new boolean[length];
    this.fitness = fitness;
  }

  public Chromosome(final Chromosome other) {
    this.params = other.params.clone();
    this.fitness = other.fitness;
  }

  public int getLength() {
    return params.length;
  }

  public int fitness() {
    return fitness.fitness(this);
  }

  public boolean getParam(final int index) {
    return params[index];
  }

  public void setParam(final int index, final boolean value) {
    params[index] = value;
  }

  public Chromosome clone() {
    return new Chromosome(this);
  }
}
