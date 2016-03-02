
'use strict';

const WorkPeriodFactory = require('./WorkPeriodFactory')
  ,  GeneticAlgorithm = require('./GeneticAlgorithm');

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

const algorithm = new GeneticAlgorithm({
  initialPopulation: 100,
  eliteCount: 2
}, factory);

algorithm.runStep();
