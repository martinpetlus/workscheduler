package workscheduler.genetics.crossover;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;

import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import static org.powermock.api.easymock.PowerMock.mockStatic;
import static org.powermock.api.easymock.PowerMock.replayAll;

import static org.easymock.EasyMock.expect;

import workscheduler.genetics.Chromosome;
import workscheduler.utils.MathUtils;
import workscheduler.utils.Pair;

@RunWith(PowerMockRunner.class)
@PrepareForTest({
  TwoPointCrossoverTest.class,
  MathUtils.class,
  AbstractCrossover.class
})
public final class TwoPointCrossoverTest {
  private Crossover crossover;

  private Chromosome chromosome1;

  private Chromosome chromosome2;

  @Before
  public void setUp() {
    crossover = new TwoPointCrossover();

    chromosome1 = new Chromosome(4, null);

    chromosome2 = new Chromosome(4, null);
    chromosome2.setGene(0, true);
    chromosome2.setGene(1, true);
    chromosome2.setGene(2, true);
    chromosome2.setGene(3, true);
  }

  @Test
  public void shouldCrossoverParentChromosomes() {
    mockStatic(Math.class);
    expect(Math.random()).andReturn(0.5);

    mockStatic(MathUtils.class);
    expect(MathUtils.randomInt(0, 3)).andReturn(2);
    expect(MathUtils.randomInt(0, 3)).andReturn(1);

    replayAll();

    crossover.crossover(Pair.of(chromosome1, chromosome2));

    assertEquals(false, chromosome1.getGene(0));
    assertEquals(true, chromosome1.getGene(1));
    assertEquals(true, chromosome1.getGene(2));
    assertEquals(false, chromosome1.getGene(3));

    assertEquals(true, chromosome2.getGene(0));
    assertEquals(false, chromosome2.getGene(1));
    assertEquals(false, chromosome2.getGene(2));
    assertEquals(true, chromosome2.getGene(3));
  }
}
