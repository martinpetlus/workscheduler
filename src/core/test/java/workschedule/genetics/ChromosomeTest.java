package workschedule.genetics;

import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.reflect.Whitebox;

@RunWith(PowerMockRunner.class)
@PrepareForTest(Chromosome.class)
public final class ChromosomeTest {
  @Test
  public void shouldCloneChromosome() {
    Chromosome other = new Chromosome(5, (final Chromosome chr) -> 333);

    other.setGene(1, true);
    other.setGene(3, true);

    Chromosome clone = other.clone();

    assertNotEquals(other, clone);

    assertNotEquals(
      Whitebox.getInternalState(other, "genes"),
      Whitebox.getInternalState(clone, "genes")
    );

    assertEquals(other.getLength(), clone.getLength());

    assertEquals(other.getGene(0), clone.getGene(0));
    assertEquals(other.getGene(1), clone.getGene(1));
    assertEquals(other.getGene(2), clone.getGene(2));
    assertEquals(other.getGene(3), clone.getGene(3));
    assertEquals(other.getGene(4), clone.getGene(4));

    assertEquals(other.fitness(), clone.fitness());
  }
}
