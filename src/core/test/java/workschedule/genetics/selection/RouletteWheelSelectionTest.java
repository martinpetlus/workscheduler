package workschedule.genetics.selection;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import static org.easymock.EasyMock.expect;

import static org.powermock.api.easymock.PowerMock.createMock;
import static org.powermock.api.easymock.PowerMock.expectLastCall;
import static org.powermock.api.easymock.PowerMock.mockStatic;
import static org.powermock.api.easymock.PowerMock.replay;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.reflect.Whitebox;

import workschedule.genetics.Chromosome;
import workschedule.genetics.Entry;
import workschedule.genetics.scaling.PositiveFitnessScaling;
import workschedule.genetics.scaling.Scaling;
import workschedule.utils.Pair;

import java.util.Arrays;
import java.util.List;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ PositiveFitnessScaling.class, RouletteWheelSelection.class })
public final class RouletteWheelSelectionTest {
  private Selection selection;

  private List<Entry> entries;

  @Before
  public void setUp() {
    int length = 3;

    entries = Arrays.asList(
      Entry.of(new Chromosome(length, null), 3),
      Entry.of(new Chromosome(length, null), 3),
      Entry.of(new Chromosome(length, null), 3),
      Entry.of(new Chromosome(length, null), 3)
    );

    Scaling scalingMock = createMock(PositiveFitnessScaling.class);
    scalingMock.scale(entries);
    expectLastCall();

    selection = new RouletteWheelSelection(scalingMock);
    selection.setEntries(entries);
  }

  @Test
  public void shouldComputeEntriesWithProbability() {
    List<ProbabilityEntry> probabilityEntries = Whitebox.getInternalState(selection, "entries");

    assertEquals(0.25, probabilityEntries.get(0).probability, 0.001);
    assertEquals(0.50, probabilityEntries.get(1).probability, 0.001);
    assertEquals(0.75, probabilityEntries.get(2).probability, 0.001);
    assertEquals(1.00, probabilityEntries.get(3).probability, 0.001);
  }

  @Test
  public void shouldSelectCorrectParentsAccordingProbabilities() {
    mockStatic(Math.class);
    expect(Math.random()).andReturn(0.0);
    expect(Math.random()).andReturn(0.6);

    expect(Math.random()).andReturn(0.1);
    expect(Math.random()).andReturn(0.6);

    expect(Math.random()).andReturn(0.25);
    expect(Math.random()).andReturn(0.6);

    expect(Math.random()).andReturn(0.3);
    expect(Math.random()).andReturn(0.6);

    expect(Math.random()).andReturn(0.5);
    expect(Math.random()).andReturn(0.8);

    expect(Math.random()).andReturn(0.6);
    expect(Math.random()).andReturn(0.8);

    expect(Math.random()).andReturn(0.75);
    expect(Math.random()).andReturn(0.1);

    expect(Math.random()).andReturn(0.8);
    expect(Math.random()).andReturn(0.1);
    replay(Math.class);

    // Check the selection of first parent according specified probabilities
    assertEquals(entries.get(0).getChromosome(), selection.selectParents().one);
    assertEquals(entries.get(0).getChromosome(), selection.selectParents().one);
    assertEquals(entries.get(1).getChromosome(), selection.selectParents().one);
    assertEquals(entries.get(1).getChromosome(), selection.selectParents().one);
    assertEquals(entries.get(2).getChromosome(), selection.selectParents().one);
    assertEquals(entries.get(2).getChromosome(), selection.selectParents().one);
    assertEquals(entries.get(3).getChromosome(), selection.selectParents().one);
    assertEquals(entries.get(3).getChromosome(), selection.selectParents().one);
  }

  @Test
  public void shouldSelectUniqueParentsFromEntries() {
    mockStatic(Math.class);
    expect(Math.random()).andReturn(0.1);
    expect(Math.random()).andReturn(0.1);
    expect(Math.random()).andReturn(0.55);
    replay(Math.class);

    Pair<Chromosome> parents = selection.selectParents();

    assertNotEquals(parents.one, parents.two);
  }
}
