package workscheduler;

import workscheduler.genetics.ChromosomeFactory;
import workscheduler.genetics.GeneticAlgorithm;
import workscheduler.genetics.GeneticAlgorithmOptions;
import workscheduler.genetics.crossover.TwoPointCrossover;
import workscheduler.genetics.mutation.StandardMutation;
import workscheduler.genetics.scaling.PositiveFitnessScaling;
import workscheduler.genetics.selection.RouletteWheelSelection;
import workscheduler.schedule.WorkScheduleFactory;
import workscheduler.schedule.options.EmployeesOption;
import workscheduler.schedule.options.ScheduleOptions;
import workscheduler.schedule.options.WeeksOption;
import workscheduler.schedule.options.WorkDaysOption;
import workscheduler.schedule.options.MinEmployeesAtWorkOption;
import workscheduler.schedule.options.MaxSuccessiveWorkDaysOption;
import workscheduler.schedule.options.MaxWorkDaysInWeekOption;
import workscheduler.schedule.options.SuccessiveWeekendsOption;

public final class Core {
  public static void main(final String[] args) {
    ScheduleOptions opts = new ScheduleOptions();

    opts.add(EmployeesOption.class, new EmployeesOption(8));
    opts.add(WeeksOption.class, new WeeksOption(4));
    opts.add(MaxSuccessiveWorkDaysOption.class, new MaxSuccessiveWorkDaysOption(4));
    opts.add(MaxWorkDaysInWeekOption.class, new MaxWorkDaysInWeekOption(5));
    opts.add(WorkDaysOption.class, new WorkDaysOption(16));
    opts.add(MinEmployeesAtWorkOption.class, new MinEmployeesAtWorkOption(3));
    opts.add(SuccessiveWeekendsOption.class, new SuccessiveWeekendsOption(2, 2));

    ChromosomeFactory factory = new WorkScheduleFactory(opts);

    GeneticAlgorithm ga = new GeneticAlgorithm(
      GeneticAlgorithmOptions.builder()
        .setPopulationSize(200)
        .setEliteCount(8)
        .build(),
      factory,
      new RouletteWheelSelection(
        new PositiveFitnessScaling()
      ),
      new TwoPointCrossover(),
      new StandardMutation()
    );

    ga.run();
  }
}
