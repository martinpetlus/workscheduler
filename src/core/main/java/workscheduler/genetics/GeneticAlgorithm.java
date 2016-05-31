package workscheduler.genetics;

import workscheduler.genetics.crossover.Crossover;
import workscheduler.genetics.mutation.Mutation;
import workscheduler.genetics.selection.Selection;
import workscheduler.utils.Pair;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public final class GeneticAlgorithm {
  private final GeneticAlgorithmOptions opts;

  private final ChromosomeFactory factory;

  private final Selection selection;

  private final Crossover crossover;

  private final Mutation mutation;

  private List<Chromosome> population;

  public GeneticAlgorithm(final GeneticAlgorithmOptions opts, final ChromosomeFactory factory,
                          final Selection selection , final Crossover crossover, final Mutation mutation) {
    this.opts = opts;
    this.factory = factory;
    this.selection = selection;
    this.crossover = crossover;
    this.mutation = mutation;
    this.population = new ArrayList<>(this.opts.getPopulationSize());

    for (int i = 0; i < this.opts.getPopulationSize(); i++) {
      this.population.add(factory.createRandom());
    }
  }

  private List<Chromosome> runStep(final List<Entry> entries) {
    List<Chromosome> newPopulation = new ArrayList<>(this.opts.getPopulationSize());

    if (this.opts.getEliteCount() > 0) {
      newPopulation.addAll(this.selectElite(entries));
    }

    this.selection.setEntries(entries);

    while (newPopulation.size() < this.opts.getPopulationSize()) {
      Pair<Chromosome> parents = this.selection.selectParents();

      Pair<Chromosome> clones = Pair.of(parents.one.clone(), parents.two.clone());

      this.crossover.crossover(clones);
      this.mutation.mutate(clones.one, clones.two);

      newPopulation.add(clones.one);
      newPopulation.add(clones.two);
    }

    return newPopulation;
  }

  private List<Chromosome> selectElite(final List<Entry> entries) {
    List<Entry> copy = new ArrayList<>(entries);

    copy.sort(this.factory.descending());

    return copy.subList(0, this.opts.getEliteCount())
      .stream()
      .map(entry -> entry.getChromosome().clone())
      .collect(Collectors.toList());
  }

  public void run() {
    int generation = 1;

    while (true) {
      System.out.println(generation++);

      List<Entry> entries = this.population
        .stream()
        .map(chromosome -> Entry.of(chromosome, chromosome.fitness()))
        .collect(Collectors.toList());

      Entry best = entries
        .stream()
        .reduce((prev, curr) ->
          this.factory.descending().compare(prev, curr) < 0 ? prev : curr
        )
        .get();

      if (best.getValue() >= 0) {
        System.out.println(best.getValue());
        break;
      }

      this.population = this.runStep(entries);
    }
  }
}
