package workschedule.genetics.crossover;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;

import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import static org.powermock.api.easymock.PowerMock.mockStatic;
import static org.powermock.api.easymock.PowerMock.replayAll;

import static org.easymock.EasyMock.expect;

import workschedule.genetics.Chromosome;
import workschedule.utils.MathUtils;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ SinglePointCrossover.class, MathUtils.class })
public final class SinglePointCrossoverTest {
    private Crossover crossover;

    private Chromosome chromosome1;

    private Chromosome chromosome2;

    private Chromosome[] parents;

    @Before
    public void setUp() {
        crossover = new SinglePointCrossover();

        chromosome1 = new Chromosome(3, null);
        chromosome2 = new Chromosome(3, null);
        chromosome2.setParam(0, true);
        chromosome2.setParam(1, true);
        chromosome2.setParam(2, true);

        parents = new Chromosome[]{chromosome1, chromosome2};
    }

    @Test
    public void crossoverMethodShouldCrossoverParentChromosomes() {
        mockStatic(Math.class);
        expect(Math.random()).andReturn(0.5);

        mockStatic(MathUtils.class);
        expect(MathUtils.randomInt(0, 1)).andReturn(1);

        replayAll();

        crossover.crossover(parents);

        assertEquals(chromosome1.getParam(0), true);
        assertEquals(chromosome1.getParam(1), true);
        assertEquals(chromosome1.getParam(2), false);

        assertEquals(chromosome2.getParam(0), false);
        assertEquals(chromosome2.getParam(1), false);
        assertEquals(chromosome2.getParam(2), true);
    }
}
