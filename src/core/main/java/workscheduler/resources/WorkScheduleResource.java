package workscheduler.resources;

import com.google.gson.Gson;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;

import workscheduler.genetics.ChromosomeFactory;
import workscheduler.schedule.WorkScheduleFactory;
import workscheduler.genetics.GeneticAlgorithm;
import workscheduler.genetics.GeneticAlgorithmOptions;
import workscheduler.genetics.scaling.PositiveFitnessScaling;
import workscheduler.genetics.selection.RouletteWheelSelection;
import workscheduler.genetics.crossover.TwoPointCrossover;
import workscheduler.genetics.mutation.StandardMutation;

import workscheduler.schedule.options.SerializableScheduleOptions;

@Path("/workschedule")
public final class WorkScheduleResource {
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.TEXT_PLAIN)
  public String post(final String jsonBody) {
    Gson gson = new Gson();

    SerializableScheduleOptions opts = gson.fromJson(jsonBody, SerializableScheduleOptions.class);
    System.out.println(opts);

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

    return "Json body: " + jsonBody;
  }
}
