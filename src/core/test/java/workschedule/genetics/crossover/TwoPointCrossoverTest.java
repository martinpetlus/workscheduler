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
import workschedule.utils.Pair;

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
    chromosome2.setParam(0, true);
    chromosome2.setParam(1, true);
    chromosome2.setParam(2, true);
    chromosome2.setParam(3, true);
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

    assertEquals(false, chromosome1.getParam(0));
    assertEquals(true, chromosome1.getParam(1));
    assertEquals(true, chromosome1.getParam(2));
    assertEquals(false, chromosome1.getParam(3));

    assertEquals(true, chromosome2.getParam(0));
    assertEquals(false, chromosome2.getParam(1));
    assertEquals(false, chromosome2.getParam(2));
    assertEquals(true, chromosome2.getParam(3));
  }
}
