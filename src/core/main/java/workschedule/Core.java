package workschedule;

import workschedule.genetics.ChromosomeFactory;
import workschedule.genetics.GeneticAlgorithm;
import workschedule.genetics.GeneticAlgorithmOptions;
import workschedule.genetics.crossover.SinglePointCrossover;
import workschedule.genetics.crossover.TwoPointCrossover;
import workschedule.genetics.mutation.StandardMutation;
import workschedule.genetics.scaling.PositiveFitnessScaling;
import workschedule.genetics.selection.RouletteWheelSelection;
import workschedule.schedule.WorkScheduleFactory;
import workschedule.schedule.options.EmployeesOption;
import workschedule.schedule.options.ScheduleOptions;
import workschedule.schedule.options.WeeksOption;
import workschedule.schedule.options.WorkDaysOption;
import workschedule.schedule.options.MinEmployeesAtWorkOption;
import workschedule.schedule.options.MaxSuccessiveWorkDaysOption;
import workschedule.schedule.options.MaxWorkDaysInWeekOption;
import workschedule.schedule.options.SuccessiveWeekendsOption;

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
