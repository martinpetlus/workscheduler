package workscheduler.schedule;

import workscheduler.genetics.Chromosome;
import workscheduler.genetics.ChromosomeFactory;
import workscheduler.genetics.Entry;
import workscheduler.schedule.fitnesses.CompositeFitness;
import workscheduler.schedule.fitnesses.Fitness;
import workscheduler.schedule.fitnesses.FitnessProvider;
import workscheduler.schedule.fitnesses.FitnessRegistry;
import workscheduler.schedule.options.ScheduleOptions;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public final class WorkScheduleFactory implements ChromosomeFactory {
  public static final Comparator<Entry> DESCENDING =
    (final Entry entry1, final Entry entry2) ->
      (int) (entry2.getValue() - entry1.getValue());

  private final ScheduleProperties props;

  private final Fitness fitness;

  public WorkScheduleFactory(final ScheduleOptions opts) {
    props = new ScheduleProperties(opts);

    List<Fitness> applied = new ArrayList<>();

    for (FitnessProvider provider : FitnessRegistry.INSTANCE) {
      if (provider.shouldApply(opts)) {
        applied.add(provider.create(props));
      }
    }

    fitness = new CompositeFitness(applied);
  }

  @Override
  public Chromosome createRandom() {
    Chromosome chr = new Chromosome(props.getLength(), fitness);

    for (int i = 0; i < chr.getLength(); i++) {
      if (Math.random() >= 0.5) {
        chr.setGene(i, true);
      }
    }

    return chr;
  }

  @Override
  public Comparator<Entry> descending() {
    return DESCENDING;
  }
}
