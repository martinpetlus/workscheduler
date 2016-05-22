package workschedule.genetics.mutation;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;

import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import static org.powermock.api.easymock.PowerMock.mockStatic;
import static org.powermock.api.easymock.PowerMock.replay;

import static org.easymock.EasyMock.expect;

import workschedule.genetics.Chromosome;
import workschedule.genetics.mutation.Mutation;
import workschedule.genetics.mutation.StandardMutation;

import java.util.ArrayList;
import java.util.List;

@RunWith(PowerMockRunner.class)
@PrepareForTest(StandardMutation.class)
public final class StandardMutationTest {
    private Mutation mutation;

    private Chromosome chromosome1;

    private Chromosome chromosome2;

    private List<Chromosome> population;

    @Before
    public void setUp() {
        mutation = new StandardMutation();

        chromosome1 = new Chromosome(2, null);
        chromosome1.setParam(0, true);

        chromosome2 = new Chromosome(2, null);
        chromosome2.setParam(1, true);

        population = new ArrayList<>();
        population.add(chromosome1);
        population.add(chromosome2);
    }

    @Test
    public void mutateMethodShouldMutateChromosomes() {
        mockStatic(Math.class);
        expect(Math.random()).andReturn(0.001);
        expect(Math.random()).andReturn(0.5);
        expect(Math.random()).andReturn(0.5);
        expect(Math.random()).andReturn(0.001);
        replay(Math.class);

        mutation.mutate(population);

        assertEquals(chromosome1.getParam(0), false);
        assertEquals(chromosome1.getParam(1), false);
        assertEquals(chromosome2.getParam(0), false);
        assertEquals(chromosome2.getParam(1), false);
    }
}
