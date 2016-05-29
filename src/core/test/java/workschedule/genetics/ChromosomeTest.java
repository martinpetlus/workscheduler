package workschedule.genetics;

import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.reflect.Whitebox;

import workschedule.schedule.fitnesses.Fitness;

@RunWith(PowerMockRunner.class)
@PrepareForTest(Chromosome.class)
public final class ChromosomeTest {
  @Test
  public void shouldCloneChromosome() {
    Chromosome other = new Chromosome(5, (final Chromosome chr) -> 333);

    other.setParam(1, true);
    other.setParam(3, true);

    Chromosome clone = other.clone();

    assertNotEquals(other, clone);

    assertNotEquals(
      Whitebox.getInternalState(other, "params"),
      Whitebox.getInternalState(clone, "params")
    );

    assertEquals(other.getLength(), clone.getLength());

    assertEquals(other.getParam(0), clone.getParam(0));
    assertEquals(other.getParam(1), clone.getParam(1));
    assertEquals(other.getParam(2), clone.getParam(2));
    assertEquals(other.getParam(3), clone.getParam(3));
    assertEquals(other.getParam(4), clone.getParam(4));

    assertEquals(other.fitness(), clone.fitness());
  }
}
