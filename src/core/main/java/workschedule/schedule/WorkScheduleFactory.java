package workschedule.schedule;

import workschedule.Chromosome;
import workschedule.ChromosomeFactory;
import workschedule.schedule.fitnesses.CompositeFitness;
import workschedule.schedule.fitnesses.Fitness;
import workschedule.schedule.fitnesses.FitnessProvider;
import workschedule.schedule.fitnesses.FitnessRegistry;
import workschedule.schedule.options.ScheduleOptions;

import java.util.ArrayList;
import java.util.List;

public final class WorkScheduleFactory implements ChromosomeFactory {
    private final ScheduleProperties props;

    private final Fitness fitness;

    private Chromosome create() {
        return new Chromosome(props.getLength(), fitness);
    }

    public WorkScheduleFactory(final ScheduleOptions opts) {
        props = new ScheduleProperties(opts);

        List<Fitness> applied = new ArrayList<Fitness>();

        for (FitnessProvider provider : FitnessRegistry.INSTANCE) {
            if (provider.shouldApply(opts)) {
                applied.add(provider.create(props));
            }
        }

        fitness = new CompositeFitness(applied);
    }

    @Override
    public Chromosome createRandom() {
        return create();
    }
}
