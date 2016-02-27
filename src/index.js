
'use strict';

const WorkingPeriodFactory = require('./WorkingPeriodFactory')
  ,  GeneticAlgorithm = require('./GeneticAlgorithm');

const factory = new WorkingPeriodFactory({
  weeks: 4,
  employees: 7,
  minEmployeesAtWork: 3,
  workingDays: 16,
  maxSuccessiveWorkingDays: 3,
  maxWorkingDaysInWeek: 5,
  successiveFreeWeekends: 2,
  successiveWorkingWeekends: 2
});

const algorithm = new GeneticAlgorithm({
  initialPopulation: 100,
  eliteCount: 2
}, factory);

algorithm.runStep();
