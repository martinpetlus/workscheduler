package workscheduler.schedule.fitnesses;

import workscheduler.schedule.options.ScheduleOptions;
import workscheduler.schedule.ScheduleProperties;

abstract class AbstractFitness implements Fitness {
  protected final ScheduleProperties props;

  protected final ScheduleOptions opts;

  protected AbstractFitness(final ScheduleProperties props) {
    this.props = props;
    this.opts = this.props.getOpts();
  }
}
