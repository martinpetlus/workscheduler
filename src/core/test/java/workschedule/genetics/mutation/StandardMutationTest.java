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

@RunWith(PowerMockRunner.class)
@PrepareForTest(StandardMutation.class)
public final class StandardMutationTest {
  private Mutation mutation;

  private Chromosome chromosome1;

  private Chromosome chromosome2;

  @Before
  public void setUp() {
    mutation = new StandardMutation();

    chromosome1 = new Chromosome(3, null);
    chromosome1.setParam(0, true);
    chromosome1.setParam(1, true);
    chromosome1.setParam(2, false);

    chromosome2 = new Chromosome(3, null);
    chromosome2.setParam(0, false);
    chromosome2.setParam(1, true);
    chromosome2.setParam(2, false);
  }

  @Test
  public void mutateMethodShouldMutateChromosomes() {
    mockStatic(Math.class);
    expect(Math.random()).andReturn(0.001);
    expect(Math.random()).andReturn(0.5);
    expect(Math.random()).andReturn(0.001);

    expect(Math.random()).andReturn(0.5);
    expect(Math.random()).andReturn(0.001);
    expect(Math.random()).andReturn(0.5);
    replay(Math.class);

    mutation.mutate(chromosome1, chromosome2);

    assertEquals(chromosome1.getParam(0), false);
    assertEquals(chromosome1.getParam(1), true);
    assertEquals(chromosome1.getParam(2), true);

    assertEquals(chromosome2.getParam(0), false);
    assertEquals(chromosome2.getParam(1), false);
    assertEquals(chromosome2.getParam(2), false);
  }
}
