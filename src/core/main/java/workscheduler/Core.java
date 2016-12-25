package workscheduler;

import com.google.gson.Gson;

import workscheduler.genetics.ChromosomeFactory;
import workscheduler.schedule.WorkScheduleFactory;
import workscheduler.genetics.GeneticAlgorithm;
import workscheduler.genetics.GeneticAlgorithmOptions;
import workscheduler.genetics.scaling.PositiveFitnessScaling;
import workscheduler.genetics.selection.RouletteWheelSelection;
import workscheduler.genetics.crossover.TwoPointCrossover;
import workscheduler.genetics.mutation.StandardMutation;

import workscheduler.schedule.options.SerializableScheduleOptions;

public final class Core {
  public static void main(String[] args) {
    Gson gson = new Gson();

    SerializableScheduleOptions opts = gson.fromJson(args[0], SerializableScheduleOptions.class);

    ChromosomeFactory factory = new WorkScheduleFactory(opts.toScheduleOptions());

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
