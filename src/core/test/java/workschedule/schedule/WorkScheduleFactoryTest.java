package workschedule.schedule;

import org.junit.Test;

import workschedule.genetics.Chromosome;
import workschedule.genetics.Entry;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

public final class WorkScheduleFactoryTest {
  @Test
  public void shouldSortEntriesInDescendingOrder() {
    List<Entry> entries = Arrays.asList(
      Entry.of(new Chromosome(3, null), -3),
      Entry.of(new Chromosome(3, null), -1),
      Entry.of(new Chromosome(3, null), -8),
      Entry.of(new Chromosome(3, null), +0),
      Entry.of(new Chromosome(3, null), -2)
    );

    entries.sort(WorkScheduleFactory.DESCENDING);

    assertEquals(+0, entries.get(0).getValue(), 0);
    assertEquals(-1, entries.get(1).getValue(), 0);
    assertEquals(-2, entries.get(2).getValue(), 0);
    assertEquals(-3, entries.get(3).getValue(), 0);
    assertEquals(-8, entries.get(4).getValue(), 0);
  }
}
