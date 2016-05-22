package workschedule.genetics.mutation;

import workschedule.genetics.Chromosome;

import java.util.List;

public final class StandardMutation implements Mutation {
    @Override
    public void mutate(final List<Chromosome> population) {
        for (int i = 0; i < population.size(); i += 1) {
            Chromosome chromosome = population.get(i);

            for (int j = 0; j < chromosome.getLength(); j += 1) {
                if (Math.random() < Mutation.PROBABILITY) {
                    chromosome.setParam(i, !chromosome.getParam(i));
                }
            }
        }
    }
}
