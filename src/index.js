
'use strict';

const WorkPeriodFactory = require('./WorkPeriodFactory')
  , GeneticAlgorithm = require('./GeneticAlgorithm')
  , RouletteWheelSelection = require('./ga/sel/roulette/RouletteWheelSelection')
  , PositiveFitnessScaler = require('./ga/PositiveFitnessScaler')
  , StandardMutator = require('./ga/mut/StandardMutator')
  , SinglePointCrossover = require('./ga/cross/SinglePointCrossover');

const factory = new WorkPeriodFactory({
  weeks: 4,
  employees: 7,
  minEmployeesAtWork: 3,
  workDays: 16,
  maxSuccessiveWorkDays: 3,
  maxWorkDaysInWeek: 5,
  successiveFreeWeekends: 2,
  successiveWorkWeekends: 2
});

const selection = new RouletteWheelSelection(
  new PositiveFitnessScaler()
);

const algorithm = new GeneticAlgorithm(
  {populationSize: 100},
  factory,
  selection,
  new SinglePointCrossover(),
  new StandardMutator()
);

algorithm.run();
