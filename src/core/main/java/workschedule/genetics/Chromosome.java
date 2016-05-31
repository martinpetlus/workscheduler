package workschedule.genetics;

import workschedule.schedule.fitnesses.Fitness;

public final class Chromosome {
  private final boolean[] genes;

  private final Fitness fitness;

  public Chromosome(final int length, final Fitness fitness) {
    this.genes = new boolean[length];
    this.fitness = fitness;
  }

  public Chromosome(final Chromosome other) {
    this.genes = other.genes.clone();
    this.fitness = other.fitness;
  }

  public int getLength() {
    return genes.length;
  }

  public int fitness() {
    return fitness.score(this);
  }

  public boolean getGene(final int index) {
    return genes[index];
  }

  public void setGene(final int index, final boolean value) {
    genes[index] = value;
  }

  public Chromosome clone() {
    return new Chromosome(this);
  }
}
