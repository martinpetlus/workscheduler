package workschedule.genetics.scaling;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

import workschedule.genetics.Chromosome;
import workschedule.genetics.Entry;

import java.util.Arrays;
import java.util.List;

public final class PositiveFitnessScalingTest {
  private Scaling scaling;

  private List<Entry> entries;

  @Before
  public void setUp() {
    scaling = new PositiveFitnessScaling();

    entries = Arrays.asList(
      Entry.of(new Chromosome(1, null), -1),
      Entry.of(new Chromosome(1, null), -2),
      Entry.of(new Chromosome(1, null), -4),
      Entry.of(new Chromosome(1, null), -8),
      Entry.of(new Chromosome(1, null), -8)
    );
  }

  @Test
  public void scalingShouldScaleEntries() {
    scaling.scale(entries);

    double delta = 0.00001;

    assertEquals(entries.get(0).getValue(), 0.5, delta);
    assertEquals(entries.get(1).getValue(), 0.25, delta);
    assertEquals(entries.get(2).getValue(), 0.125, delta);
    assertEquals(entries.get(3).getValue(), 0.0625, delta);
    assertEquals(entries.get(4).getValue(), 0.0625, delta);
  }
}
