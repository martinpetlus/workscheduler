package workschedule.genetics.mutation;

import workschedule.genetics.Chromosome;

import java.util.List;

public interface Mutation {
    public void mutate(List<Chromosome> population);
}
