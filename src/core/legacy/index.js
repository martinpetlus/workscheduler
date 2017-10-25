
'use strict';

GLOBAL.__DEV__ = true;

if (__DEV__) {
  Object.assign(GLOBAL, require('./debug/DebugsMixin'));
}

const WorkPeriodFactory = require('./WorkPeriodFactory')
  , GeneticAlgorithm = require('./ga/GeneticAlgorithm')
  , RouletteWheelSelection = require('./ga/sel/roulette/RouletteWheelSelection')
  , PositiveFitnessScaler = require('./ga/PositiveFitnessScaler')
  , StandardMutator = require('./ga/mut/StandardMutator')
  , TwoPointCrossover = require('./ga/cross/TwoPointCrossover')
  , SinglePointCrossover = require('./ga/cross/SinglePointCrossover');

const factory = new WorkPeriodFactory({
  weeks: 4,
  employees: 7,
  minEmployeesAtWork: 3,
  workdays: 16,
  maxSuccessiveWorkDays: 3,
  maxWorkDaysInWeek: 5,
  successiveFreeWeekends: 2,
  successiveWorkWeekends: 2
});

const selection = new RouletteWheelSelection(
  new PositiveFitnessScaler()
);

const algorithm = new GeneticAlgorithm(
  {populationSize: 100, eliteCount: 4},
  factory,
  selection,
  new TwoPointCrossover(),
  new StandardMutator()
);

algorithm.run();
