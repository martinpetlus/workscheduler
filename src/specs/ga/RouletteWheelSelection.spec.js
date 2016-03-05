
'use strict';

const RouletteWheelSelection = require('../../ga/sel/roulette/RouletteWheelSelection');

describe('RouletteWheelSelection', function() {
  let selection, entries;

  beforeEach(function() {
    selection = new RouletteWheelSelection({
      scale(entries) {
        return entries;
      }
    });
    entries = [
      {chromosome: {}, fitness: 3},
      {chromosome: {}, fitness: 3},
      {chromosome: {}, fitness: 3},
      {chromosome: {}, fitness: 3}
    ];
    selection.setEntries(entries);
  });

  it('should set entries', function() {
    expect(selection.entries[0].probability).toBe(0.25);
    expect(selection.entries[1].probability).toBe(0.50);
    expect(selection.entries[2].probability).toBe(0.75);
    expect(selection.entries[3].probability).toBe(1);
  });

  it('should randomly select parent from entries', function() {
    let probability;

    spyOn(Math, 'random').andCallFake(function() {
      return probability;
    });

    probability = 0;
    expect(selection.selectParent()).toBe(entries[0].chromosome);

    probability = 0.1;
    expect(selection.selectParent()).toBe(entries[0].chromosome);

    probability = 0.25;
    expect(selection.selectParent()).toBe(entries[1].chromosome);

    probability = 0.3;
    expect(selection.selectParent()).toBe(entries[1].chromosome);

    probability = 0.5;
    expect(selection.selectParent()).toBe(entries[2].chromosome);

    probability = 0.6;
    expect(selection.selectParent()).toBe(entries[2].chromosome);

    probability = 0.75;
    expect(selection.selectParent()).toBe(entries[3].chromosome);

    probability = 0.8;
    expect(selection.selectParent()).toBe(entries[3].chromosome);
  });

  it('should randomly select unique parents from entries', function() {
    let calls = 0;

    spyOn(Math, 'random').andCallFake(function() {
      calls += 1;

      if (calls <= 2) {
        return 0.1;
      } else {
        return 0.5;
      }
    });

    const parents = selection.selectParents();
    expect(parents[0]).not.toBe(parents[1]);
  });
});
